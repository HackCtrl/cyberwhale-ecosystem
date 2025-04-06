
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Bot, BookOpen, ExternalLink, Mail, Github, Twitter } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-cyberdark-950 pt-16 border-t border-cyberdark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">CyberWhale</h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:cyberehaleoffical@gmail.com" className="text-gray-400 hover:text-white transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer.platform')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ctf" className="text-gray-400 hover:text-white transition flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>{t('nav.ctf')}</span>
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="text-gray-400 hover:text-white transition flex items-center">
                  <Bot className="w-4 h-4 mr-2" />
                  <span>{t('nav.ai_assistant')}</span>
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-white transition flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{t('nav.community')}</span>
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="text-gray-400 hover:text-white transition flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>{t('nav.knowledge')}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition">
                  {t('footer.support')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.contact')}
            </p>
            <a 
              href="https://t.me/Valerri_09" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-4 py-2 rounded bg-cyberblue-500 hover:bg-cyberblue-600 text-white transition"
            >
              {t('footer.contact_button')}
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-cyberdark-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} CyberWhale. {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
