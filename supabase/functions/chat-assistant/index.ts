
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const HUGGING_FACE_API_KEY = Deno.env.get('HUGGING_FACE_API_KEY') || '';
const MODEL_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Обработка CORS preflight запросов
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history } = await req.json();

    // Формируем структуру запроса для модели
    const payload = {
      inputs: {
        text: message,
        past_user_inputs: history.filter(msg => !msg.isBot).map(msg => msg.text).slice(-5),
        generated_responses: history.filter(msg => msg.isBot).map(msg => msg.text).slice(-5)
      },
      parameters: {
        max_new_tokens: 250,
        temperature: 0.7,
        top_p: 0.95,
        do_sample: true,
      }
    };

    // Отправляем запрос к Hugging Face API
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // Обрабатываем ответ
    const result = await response.json();

    // Проверяем, что получили корректный ответ
    if (result.error) {
      throw new Error(result.error);
    }

    const botResponse = result.generated_text || "Извините, я не смог сгенерировать ответ. Пожалуйста, попробуйте еще раз.";

    // Возвращаем результат
    return new Response(
      JSON.stringify({ 
        botResponse: botResponse,
        success: true 
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ 
        botResponse: "Произошла ошибка при обработке запроса. Пожалуйста, попробуйте позже.",
        success: false,
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
