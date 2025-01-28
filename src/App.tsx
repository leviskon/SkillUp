import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Users, 
  Target,
  Rocket,
  GraduationCap,
  LineChart,
  X,
  User,
  LogOut
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

interface FormData {
  email: string;
  password: string;
  username: string;
  role: 'admin' | 'teacher' | 'student';
}

function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    username: '',
    role: 'student'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (signInError) throw signInError;
      } else {
        // First check if username is available
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', formData.username)
          .single();

        if (existingUser) {
          throw new Error('Этот никнейм уже занят');
        }

        const { error: signUpError, data } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              username: formData.username,
              role: formData.role,
            }
          }
        });

        if (signUpError) throw signUpError;

        // Show success message
        setError('Регистрация успешна! Теперь вы можете войти.');
        setMode('login');
        setFormData({
          email: '',
          password: '',
          username: '',
          role: 'student'
        });
        return;
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-1.5 top-1.5 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {error && (
          <div className={`mb-4 p-3 rounded ${
            error.includes('успешна') 
              ? 'bg-green-500 bg-opacity-10 border border-green-500 text-green-500'
              : 'bg-red-500 bg-opacity-10 border border-red-500 text-red-500'
          }`}>
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="flex space-x-4 mb-6">
            <button 
              className={`flex-1 py-2 rounded-lg transition-colors ${
                mode === 'login' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setMode('login')}
            >
              Вход
            </button>
            <button 
              className={`flex-1 py-2 rounded-lg transition-colors ${
                mode === 'register' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setMode('register')}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Никнейм
                </label>
                <input 
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Введите никнейм"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z0-9_-]+"
                  title="Только буквы, цифры, дефис и подчеркивание"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                placeholder="Введите email"
                required
              />
            </div>
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Роль
                </label>
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="student">Студент</option>
                  <option value="teacher">Учитель</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Пароль
              </label>
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                placeholder="Введите пароль"
                required
                minLength={6}
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [session, setSession] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error && data) {
      setUserProfile(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const renderDashboard = () => {
    if (!userProfile) return null;

    switch (userProfile.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-95 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                SkillUp
              </a>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-white transition duration-300">Главная</a>
                <a href="#" className="text-gray-300 hover:text-white transition duration-300">Курсы</a>
                <a href="#" className="text-gray-300 hover:text-white transition duration-300">О нас</a>
                <a href="#" className="text-gray-300 hover:text-white transition duration-300">Контакты</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <span className="text-gray-300">{userProfile?.username}</span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="px-4 py-2 text-gray-300 hover:text-white transition duration-300"
                  >
                    Войти
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
                  >
                    Регистрация
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {session ? (
        <div className="pt-16">
          {renderDashboard()}
        </div>
      ) : (
        <>
          <header className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
                alt="Background"
                className="w-full h-full object-cover opacity-10"
              />
            </div>
            <div className="container mx-auto px-6 z-10 text-center">
              <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                SkillUp
              </h1>
              <p className="text-2xl text-gray-300 mb-8">
                Трансформируйте свое будущее через современное образование
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
                Начать обучение
              </button>
            </div>
          </header>

          <section className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-16">Почему выбирают нас</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-lg">
                  <Brain className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Адаптивное обучение</h3>
                  <p className="text-gray-300">Персонализированный подход к каждому студенту</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-lg">
                  <Trophy className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Признанные эксперты</h3>
                  <p className="text-gray-300">Обучение от ведущих специалистов индустрии</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-lg">
                  <Target className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Практический опыт</h3>
                  <p className="text-gray-300">Реальные проекты и практические задания</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-16">Популярные курсы</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Web Development",
                    icon: <Rocket className="w-8 h-8 text-blue-400" />,
                    students: "1,200+",
                    duration: "6 месяцев"
                  },
                  {
                    title: "Data Science",
                    icon: <LineChart className="w-8 h-8 text-blue-400" />,
                    students: "800+",
                    duration: "8 месяцев"
                  },
                  {
                    title: "UI/UX Design",
                    icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
                    students: "950+",
                    duration: "4 месяца"
                  }
                ].map((course, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition duration-300">
                    <div className="flex items-center mb-4">
                      {course.icon}
                      <h3 className="text-xl font-bold ml-3">{course.title}</h3>
                    </div>
                    <div className="text-gray-400">
                      <p>Студентов: {course.students}</p>
                      <p>Длительность: {course.duration}</p>
                    </div>
                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                      Подробнее
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-16">Наши достижения</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "15,000+", label: "Студентов" },
                  { number: "95%", label: "Трудоустройство" },
                  { number: "200+", label: "Курсов" },
                  { number: "50+", label: "Экспертов" }
                ].map((stat, index) => (
                  <div key={index} className="p-6 bg-gray-700 rounded-lg">
                    <h3 className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</h3>
                    <p className="text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-16">Наша команда</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    name: "Александр Петров",
                    role: "Основатель и CEO",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                  },
                  {
                    name: "Елена Соколова",
                    role: "Директор по обучению",
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                  },
                  {
                    name: "Михаил Волков",
                    role: "Технический директор",
                    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80"
                  }
                ].map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-gray-400">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="bg-gray-800 py-12">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-2xl font-bold mb-4 md:mb-0">SkillUp</div>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-white transition duration-300">О нас</a>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-300">Курсы</a>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-300">Контакты</a>
                </div>
              </div>
              <div className="mt-8 text-center text-gray-400">
                © 2024 SkillUp. Все права защищены.
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;