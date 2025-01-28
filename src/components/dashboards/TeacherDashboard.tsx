import React from 'react';
import { BookOpen, Users, Calendar } from 'lucide-react';

export function TeacherDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Кабинет преподавателя</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold">Мои курсы</h3>
          </div>
          <p className="text-gray-400">3 активных курса</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold">Студенты</h3>
          </div>
          <p className="text-gray-400">128 активных студентов</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Calendar className="w-8 h-8 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold">Расписание</h3>
          </div>
          <p className="text-gray-400">2 занятия сегодня</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ближайшие занятия</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">JavaScript Основы</h4>
                <p className="text-gray-400">Группа A-1</p>
              </div>
              <span className="text-gray-400">14:00</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">React для начинающих</h4>
                <p className="text-gray-400">Группа B-2</p>
              </div>
              <span className="text-gray-400">16:30</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Задачи на проверку</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Проект: Todo App</h4>
                <p className="text-gray-400">5 работ на проверке</p>
              </div>
              <button className="text-blue-400 hover:text-blue-300">Проверить</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">DOM Манипуляции</h4>
                <p className="text-gray-400">3 работы на проверке</p>
              </div>
              <button className="text-blue-400 hover:text-blue-300">Проверить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}