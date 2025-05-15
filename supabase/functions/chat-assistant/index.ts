
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Используем предоставленный токен
const HUGGING_FACE_API_KEY = Deno.env.get('HUGGING_FACE_API_KEY') || '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';

// Изменяем модель на более доступную без специальных разрешений
const MODEL_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

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

    console.log(`Sending request to Hugging Face API with message: ${message}`);
    console.log(`History items: ${history.length}`);

    // Формируем структуру запроса для модели (blenderbot использует более простой формат)
    const payload = {
      inputs: message,
      parameters: {
        max_length: 100,
        temperature: 0.7,
        top_p: 0.9,
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
    console.log(`Response from Hugging Face API: ${JSON.stringify(result)}`);

    // Проверяем, что получили корректный ответ
    if (result.error) {
      throw new Error(result.error);
    }

    // BlenderBot возвращает массив с ответом, получаем первый элемент
    const botResponse = Array.isArray(result) && result.length > 0 
      ? result[0].generated_text 
      : "Извините, я не смог сгенерировать ответ. Пожалуйста, попробуйте еще раз.";
      
    console.log(`Bot response: ${botResponse}`);

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
