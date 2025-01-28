import React from 'react';
import { Users, BookOpen, Settings } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold">Пользователи</h3>
          </div>
          <p className="text-gray-400">Управление пользователями и ролями</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold">Курсы</h3>
          </div>
          <p className="text-gray-400">Управление курсами и материалами</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Settings className="w-8 h-8 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold">Настройки</h3>
          </div>
          <p className="text-gray-400">Системные настройки</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Последние действия</h2>
        <div className="space-y-4">
          {/* Placeholder for activity log */}
          <div className="flex items-center text-gray-400">
            <span className="w-24">12:30</span>
            <span>Добавлен новый курс "JavaScript Основы"</span>
          </div>
          <div className="flex items-center text-gray-400">
            <span className="w-24">11:45</span>
            <span>Изменены права пользователя ID#1234</span>
          </div>
          <div className="flex items-center text-gray-400">
            <span className="w-24">10:15</span>
            <span>Обновлены системные настройки</span>
          </div>
        </div>
      </div>
    </div>
  );
}