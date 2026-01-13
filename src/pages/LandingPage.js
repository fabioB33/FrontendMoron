import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { FileCheck, Clock, Shield, Bot, CheckCircle, ArrowRight, Zap, Users, TrendingUp, BarChart3, Database, FileSpreadsheet, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';

export const LandingPage = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                <Bot className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Con Asistente de IA 24/7</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Habilitaciones Comerciales{' '}
                <span className="text-blue-600">más rápidas</span> y{' '}
                <span className="text-blue-600">simples</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Sistema de Habilitación Precaria Automática. Obtené tu autorización de funcionamiento en 24 horas con inteligencia artificial.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register">
                  <Button
                    data-testid="hero-cta-btn"
                    size="lg"
                    className="w-full sm:w-auto h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Comenzar Ahora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    data-testid="hero-login-btn"
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-14 px-8 border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 font-medium rounded-xl"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium">100% Digital</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Seguro</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <span className="font-medium">24 horas</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                  alt="Oficina moderna"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">+200</p>
                    <p className="text-sm text-slate-600">Comercios</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white p-5 rounded-xl shadow-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Asistente IA</p>
                    <p className="text-xs text-slate-600">24/7 disponible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ¿Por qué elegir nuestro sistema?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tecnología al servicio de los comerciantes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              data-testid="feature-card-rapido"
              className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rápido y Simple</h3>
              <p className="text-slate-600 leading-relaxed">
                Para locales menores a 200 m², obtené tu Habilitación Precaria en menos de 24 horas y comenzá a operar.
              </p>
            </div>

            <div
              data-testid="feature-card-ia"
              className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Asistente con IA</h3>
              <p className="text-slate-600 leading-relaxed">
                Tu asistente virtual te guía paso a paso, responde tus dudas y ayuda a completar el trámite correctamente.
              </p>
            </div>

            <div
              data-testid="feature-card-seguro"
              className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">100% Seguro</h3>
              <p className="text-slate-600 leading-relaxed">
                Tus datos están protegidos. Sistema certificado por la Argentina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - NEW */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Beneficios de la plataforma
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Una solución moderna para la gestión municipal eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Escalabilidad digital
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Permite sumar nuevos trámites y crecer hacia un municipio digital.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Database className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Datos y previsibilidad
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Brinda información clara para planificar y tomar mejores decisiones.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Eficiencia administrativa
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Reduce tiempos, errores y carga de trabajo interno.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Formalización y recaudación
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Facilita la formalización y mejora el cumplimiento tributario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Proceso simple en 4 pasos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Obtené tu habilitación comercial de forma ágil
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Registrate',
                description: 'Creá tu cuenta con tu CUIT/CUIL',
                icon: Users,
                color: 'bg-blue-100 text-blue-600'
              },
              {
                step: '02',
                title: 'Completá el formulario',
                description: 'El asistente IA te guía en cada campo',
                icon: FileCheck,
                color: 'bg-violet-100 text-violet-600'
              },
              {
                step: '03',
                title: 'Subí documentación',
                description: 'DNI, boleta ABL, plano del local',
                icon: FileCheck,
                color: 'bg-purple-100 text-purple-600'
              },
              {
                step: '04',
                title: 'Obtené tu Habilitación Precaria',
                description: '¡Listo para operar en 30 días!',
                icon: CheckCircle,
                color: 'bg-emerald-100 text-emerald-600'
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-testid={`step-card-${item.step}`}
                  className="relative text-center"
                >
                  <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:shadow-md transition-all h-full">
                    <div className="flex flex-col items-center">
                      <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      
                      <div className="text-xs font-bold text-slate-400 mb-3">PASO {item.step}</div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  {idx < 3 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-6 h-6 text-slate-300 -translate-y-1/2 z-10" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Time indicator */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 border border-blue-200 rounded-full">
              <Clock className="w-5 h-5 text-blue-600" />
              <p className="text-blue-900 font-medium">
                Tiempo promedio del proceso: <span className="font-bold">24 horas</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para habilitar tu comercio?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Unite a los cientos de comerciantes que ya confían en nuestro sistema
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  data-testid="cta-register-btn"
                  size="lg"
                  className="w-full sm:w-auto h-14 px-10 bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-xl transition-all shadow-lg"
                >
                  Comenzar mi Trámite
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white font-medium rounded-xl"
                >
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
              <div>
                <p className="text-4xl font-bold mb-2">+200</p>
                <p className="text-slate-400 text-sm">Comercios habilitados</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">24hs</p>
                <p className="text-slate-400 text-sm">Tiempo promedio</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">24/7</p>
                <p className="text-slate-400 text-sm">Asistente disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
