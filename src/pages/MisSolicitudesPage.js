import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { Plus, Clock, CheckCircle, XCircle, ClipboardCheck, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

export const MisSolicitudesPage = () => {
  const [afaps, setAfaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAfaps();
  }, []);

  const loadAfaps = async () => {
    try {
      const response = await api.get('/afap');
      setAfaps(response.data);
    } catch (error) {
      console.error('Error loading Habilitaciones Precarias:', error);
      toast.error('Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCertificate = async (afapId, numeroAfap) => {
    try {
      const response = await api.get(`/afap/${afapId}/certificado`, {
        responseType: 'blob'
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `HabilitacionPrecaria_${numeroAfap}_Argentina.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      toast.success('Certificado descargado exitosamente');
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast.error(error.response?.data?.detail || 'Error al descargar el certificado');
    }
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: { 
        color: 'text-amber-700 bg-amber-50 border-amber-200', 
        icon: Clock,
        label: 'Pendiente' 
      },
      aprobado: { 
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200', 
        icon: CheckCircle,
        label: 'Aprobado' 
      },
      rechazado: { 
        color: 'text-red-700 bg-red-50 border-red-200', 
        icon: XCircle,
        label: 'Rechazado' 
      },
      inspeccion: { 
        color: 'text-blue-700 bg-blue-50 border-blue-200', 
        icon: ClipboardCheck,
        label: 'En Inspección' 
      },
    };
    
    const badge = badges[estado] || badges.pendiente;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div data-testid="mis-solicitudes-page" className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Mis Solicitudes Habilitación Precaria</h1>
            <p className="text-slate-600">Administrá y seguí el estado de tus solicitudes</p>
          </div>
          <Link to="/nueva-solicitud">
            <Button data-testid="nueva-solicitud-header-btn" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Nueva Solicitud
            </Button>
          </Link>
        </div>

        {/* Habilitaciones Precarias List */}
        {afaps.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No tenés solicitudes aún</h3>
            <p className="text-slate-600 mb-6">Creá tu primera solicitud Habilitación Precaria para comenzar</p>
            <Link to="/nueva-solicitud">
              <Button data-testid="empty-state-create-btn" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Crear Primera Solicitud
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {afaps.map((afap) => (
              <div
                key={afap.id}
                data-testid={`habilitacion_precaria-card-${afap.numero_afap}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">Habilitación Precaria #{afap.numero_afap}</h3>
                      {getEstadoBadge(afap.estado)}
                    </div>
                    <p className="text-slate-600">{afap.rubro_descripcion}</p>
                  </div>
                  <div className="flex gap-2">
                    {afap.estado === 'aprobado' && (
                      <Button
                        data-testid={`download-certificate-${afap.numero_afap}`}
                        onClick={() => handleDownloadCertificate(afap.id, afap.numero_afap)}
                        className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Descargar Certificado
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Domicilio</p>
                    <p className="text-sm font-medium text-slate-900">
                      {afap.domicilio_calle} {afap.domicilio_altura}
                    </p>
                    <p className="text-xs text-slate-600">{afap.domicilio_localidad}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 mb-1">Rubro</p>
                    <p className="text-sm font-medium text-slate-900">{afap.rubro_tipo}</p>
                    <p className="text-xs text-slate-600">{afap.rubro_subrubro}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 mb-1">Superficie</p>
                    <p className="text-sm font-medium text-slate-900">{afap.metros_cuadrados} m²</p>
                    {afap.fecha_vencimiento && (
                      <p className="text-xs text-slate-600">
                        Vence: {new Date(afap.fecha_vencimiento).toLocaleDateString('es-AR')}
                      </p>
                    )}
                  </div>
                </div>

                {afap.observaciones && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Observaciones:</strong> {afap.observaciones}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};