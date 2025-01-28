import React from 'react';
import { BookOpen, Award, Clock } from 'lucide-react';

export function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Кабинет студента</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold">Мои курсы</h3>
          </div>
          <p className="text-gray-400">2 активных курса</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Award className="w-8 h-8 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold">Достижения</h3>
          </div>
          <p className="text-gray-400">5 полученных наград</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Clock className="w-8 h-8 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold">Время обучения</h3>
          </div>
          <p className="text-gray-400">24 часа за неделю</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Текущие курсы</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">JavaScript Основы</h4>
                <span className="text-blue-400">75% завершено</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">React для начинающих</h4>
                <span className="text-blue-400">45% завершено</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ближайшие дедлайны</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Проект: Todo App</h4>
                <p className="text-gray-400">JavaScript Основы</p>
              </div>
              <span className="text-red-400">Завтра</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">React Компоненты</h4>
                <p className="text-gray-400">React для начинающих</p>
              </div>
              <span className="text-gray-400">3 дня</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}