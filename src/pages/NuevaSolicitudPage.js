import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { ArrowRight, ArrowLeft, FileText, Building2, MapPin, Wrench } from 'lucide-react';
import { toast } from 'sonner';

export const NuevaSolicitudPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Datos del solicitante (precargados)
    solicitante_nombre: user?.nombre || '',
    solicitante_apellido: user?.apellido || '',
    solicitante_cuit_cuil: user?.cuit_cuil || '',
    solicitante_telefono: user?.telefono || '',
    solicitante_email: user?.email || '',
    
    // Datos del titular
    titular_tipo: 'fisica',
    titular_nombre: '',
    titular_cuit: '',
    cuenta_abl: '',
    
    // Domicilio
    domicilio_calle: '',
    domicilio_altura: '',
    domicilio_piso: '',
    domicilio_depto: '',
    domicilio_local: '',
    domicilio_localidad: 'Buenos Aires',
    
    // Rubro
    rubro_tipo: '',
    rubro_subrubro: '',
    rubro_descripcion: '',
    metros_cuadrados: '',
    
    // Características constructivas
    techos_cielorasos: '',
    pisos_material: '',
    
    // Sanitarios
    tiene_sanitarios: true,
    sanitarios_acceso_directo: false,
    sanitarios_antecamara: false,
    sanitarios_lavabos_m: 0,
    sanitarios_retretes_m: 0,
    sanitarios_lavabos_f: 0,
    sanitarios_retretes_f: 0,
    sanitarios_migitorios: 0,
    sanitarios_discapacitados: false,
    cantidad_trabajadores: 1,
    
    documentos_urls: []
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        metros_cuadrados: parseFloat(formData.metros_cuadrados),
        cantidad_trabajadores: parseInt(formData.cantidad_trabajadores),
        sanitarios_lavabos_m: parseInt(formData.sanitarios_lavabos_m),
        sanitarios_retretes_m: parseInt(formData.sanitarios_retretes_m),
        sanitarios_lavabos_f: parseInt(formData.sanitarios_lavabos_f),
        sanitarios_retretes_f: parseInt(formData.sanitarios_retretes_f),
        sanitarios_migitorios: parseInt(formData.sanitarios_migitorios),
      };

      await api.post('/habilitacion_precaria', submitData);
      toast.success('¡Solicitud Habilitación Precaria creada exitosamente!');
      navigate('/mis-solicitudes');
    } catch (error) {
      console.error('Error creating Habilitación Precaria:', error);
      toast.error(error.response?.data?.detail || 'Error al crear la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <DashboardLayout>
      <div data-testid="nueva-solicitud-page" className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Nueva Solicitud Habilitación Precaria</h1>
          <p className="text-slate-600">Completá el formulario para solicitar tu Autorización de Funcionamiento</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Titular', icon: Building2 },
              { num: 2, label: 'Domicilio', icon: MapPin },
              { num: 3, label: 'Rubro', icon: FileText },
              { num: 4, label: 'Detalles', icon: Wrench }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.num}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step >= item.num 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{item.label}</span>
                  </div>
                  {idx < 3 && (
                    <div className={`flex-1 h-1 mx-4 ${
                      step > item.num ? 'bg-blue-600' : 'bg-slate-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="p-8">
            {/* Step 1: Datos del Titular */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Datos del Titular</h2>
                
                <div className="space-y-2">
                  <Label>Tipo de Titular</Label>
                  <Select value={formData.titular_tipo} onValueChange={(val) => handleChange('titular_tipo', val)}>
                    <SelectTrigger data-testid="titular-tipo-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fisica">Persona Física</SelectItem>
                      <SelectItem value="juridica">Persona Jurídica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nombre/Razón Social *</Label>
                    <Input
                      data-testid="titular-nombre-input"
                      value={formData.titular_nombre}
                      onChange={(e) => handleChange('titular_nombre', e.target.value)}
                      placeholder="Juan Pérez / Empresa SRL"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>CUIT {formData.titular_tipo === 'juridica' ? 'de la Empresa' : ''} *</Label>
                    <Input
                      data-testid="titular-cuit-input"
                      value={formData.titular_cuit}
                      onChange={(e) => handleChange('titular_cuit', e.target.value)}
                      placeholder="20-12345678-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Número de Cuenta ABL *</Label>
                  <Input
                    data-testid="cuenta-abl-input"
                    value={formData.cuenta_abl}
                    onChange={(e) => handleChange('cuenta_abl', e.target.value)}
                    placeholder="12345678"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Domicilio */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Domicilio del Comercio</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label>Calle *</Label>
                    <Input
                      data-testid="domicilio-calle-input"
                      value={formData.domicilio_calle}
                      onChange={(e) => handleChange('domicilio_calle', e.target.value)}
                      placeholder="Av. Principal"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Altura *</Label>
                    <Input
                      data-testid="domicilio-altura-input"
                      value={formData.domicilio_altura}
                      onChange={(e) => handleChange('domicilio_altura', e.target.value)}
                      placeholder="1234"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Piso</Label>
                    <Input
                      data-testid="domicilio-piso-input"
                      value={formData.domicilio_piso}
                      onChange={(e) => handleChange('domicilio_piso', e.target.value)}
                      placeholder="PB, 1, 2..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Departamento</Label>
                    <Input
                      data-testid="domicilio-depto-input"
                      value={formData.domicilio_depto}
                      onChange={(e) => handleChange('domicilio_depto', e.target.value)}
                      placeholder="A, B, C..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Local</Label>
                    <Input
                      data-testid="domicilio-local-input"
                      value={formData.domicilio_local}
                      onChange={(e) => handleChange('domicilio_local', e.target.value)}
                      placeholder="Local 1, 2..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Localidad *</Label>
                  <Input
                    value={formData.domicilio_localidad}
                    onChange={(e) => handleChange('domicilio_localidad', e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Rubro */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Rubro y Actividad</h2>
                
                <div className="space-y-2">
                  <Label>Tipo de Rubro *</Label>
                  <Select value={formData.rubro_tipo} onValueChange={(val) => handleChange('rubro_tipo', val)}>
                    <SelectTrigger data-testid="rubro-tipo-select">
                      <SelectValue placeholder="Seleccioná el tipo de rubro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Comercio Minorista">Comercio Minorista</SelectItem>
                      <SelectItem value="Gastronomía">Gastronomía</SelectItem>
                      <SelectItem value="Servicios">Servicios</SelectItem>
                      <SelectItem value="Oficinas">Oficinas</SelectItem>
                      <SelectItem value="Otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Subrubro *</Label>
                  <Input
                    data-testid="rubro-subrubro-input"
                    value={formData.rubro_subrubro}
                    onChange={(e) => handleChange('rubro_subrubro', e.target.value)}
                    placeholder="Ej: Panadería, Cafetería, Consultorio..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Descripción de la Actividad *</Label>
                  <Textarea
                    data-testid="rubro-descripcion-input"
                    value={formData.rubro_descripcion}
                    onChange={(e) => handleChange('rubro_descripcion', e.target.value)}
                    placeholder="Describí brevemente la actividad comercial que vas a desarrollar"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Metros Cuadrados *</Label>
                  <Input
                    data-testid="metros-cuadrados-input"
                    type="number"
                    step="0.01"
                    value={formData.metros_cuadrados}
                    onChange={(e) => handleChange('metros_cuadrados', e.target.value)}
                    placeholder="85.5"
                    required
                  />
                  <p className="text-xs text-slate-500">Habilitación Precaria aplica para locales menores a 200 m²</p>
                </div>
              </div>
            )}

            {/* Step 4: Detalles */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Características y Detalles</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Techos/Cielorrasos *</Label>
                    <Input
                      value={formData.techos_cielorasos}
                      onChange={(e) => handleChange('techos_cielorasos', e.target.value)}
                      placeholder="Ej: Cielorraso de yeso"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Material de Pisos *</Label>
                    <Input
                      value={formData.pisos_material}
                      onChange={(e) => handleChange('pisos_material', e.target.value)}
                      placeholder="Ej: Cerámico antideslizante"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cantidad de Trabajadores *</Label>
                  <Input
                    type="number"
                    value={formData.cantidad_trabajadores}
                    onChange={(e) => handleChange('cantidad_trabajadores', e.target.value)}
                    min="1"
                    required
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Servicios Sanitarios</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="tiene-sanitarios"
                        checked={formData.tiene_sanitarios}
                        onChange={(e) => handleChange('tiene_sanitarios', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="tiene-sanitarios" className="cursor-pointer">
                        El local cuenta con servicios sanitarios
                      </Label>
                    </div>

                    {formData.tiene_sanitarios && (
                      <>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="sanitarios-acceso-directo"
                              checked={formData.sanitarios_acceso_directo}
                              onChange={(e) => handleChange('sanitarios_acceso_directo', e.target.checked)}
                              className="w-4 h-4"
                            />
                            <Label htmlFor="sanitarios-acceso-directo" className="cursor-pointer text-sm">
                              Acceso directo
                            </Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="sanitarios-antecamara"
                              checked={formData.sanitarios_antecamara}
                              onChange={(e) => handleChange('sanitarios_antecamara', e.target.checked)}
                              className="w-4 h-4"
                            />
                            <Label htmlFor="sanitarios-antecamara" className="cursor-pointer text-sm">
                              Con antecámara
                            </Label>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs">Lavabos M</Label>
                            <Input
                              type="number"
                              min="0"
                              value={formData.sanitarios_lavabos_m}
                              onChange={(e) => handleChange('sanitarios_lavabos_m', e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs">Retretes M</Label>
                            <Input
                              type="number"
                              min="0"
                              value={formData.sanitarios_retretes_m}
                              onChange={(e) => handleChange('sanitarios_retretes_m', e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs">Lavabos F</Label>
                            <Input
                              type="number"
                              min="0"
                              value={formData.sanitarios_lavabos_f}
                              onChange={(e) => handleChange('sanitarios_lavabos_f', e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs">Retretes F</Label>
                            <Input
                              type="number"
                              min="0"
                              value={formData.sanitarios_retretes_f}
                              onChange={(e) => handleChange('sanitarios_retretes_f', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">Mingitorios</Label>
                            <Input
                              type="number"
                              min="0"
                              value={formData.sanitarios_migitorios}
                              onChange={(e) => handleChange('sanitarios_migitorios', e.target.value)}
                            />
                          </div>

                          <div className="flex items-center gap-2 pt-8">
                            <input
                              type="checkbox"
                              id="sanitarios-discapacitados"
                              checked={formData.sanitarios_discapacitados}
                              onChange={(e) => handleChange('sanitarios_discapacitados', e.target.checked)}
                              className="w-4 h-4"
                            />
                            <Label htmlFor="sanitarios-discapacitados" className="cursor-pointer text-sm">
                              Baño para discapacitados
                            </Label>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              {step < 4 ? (
                <Button type="button" onClick={nextStep}>
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="submit-habilitacion_precaria-btn"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Enviando...' : 'Enviar Solicitud'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
};
