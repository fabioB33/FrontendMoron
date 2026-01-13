import React, { useEffect, useState, useMemo } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Clock, CheckCircle, XCircle, ClipboardCheck, Eye, Download, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';

export const SolicitudesPage = () => {
  const { user } = useAuth();
  const [afaps, setAfaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('fecha'); // 'fecha', 'numero', 'nombre'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

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

  const handleUpdateEstado = async (afapId, nuevoEstado, observaciones) => {
    try {
      await api.patch(`/afap/${afapId}/estado?estado=${nuevoEstado}&observaciones=${encodeURIComponent(observaciones || '')}`);
      toast.success('Estado actualizado correctamente');
      loadAfaps();
    } catch (error) {
      console.error('Error updating estado:', error);
      toast.error('Error al actualizar el estado');
    }
  };

  const handleDownloadCertificate = async (afapId, numeroAfap) => {
    try {
      const response = await api.get(`/afap/${afapId}/certificado`, {
        responseType: 'blob'
      });
      
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

  // Filtrado y búsqueda avanzada
  const filteredAndSortedAfaps = useMemo(() => {
    let result = [...afaps];

    // Filtro por estado
    if (filter !== 'all') {
      result = result.filter(habilitacion_precaria => afap.estado === filter);
    }

    // Búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(habilitacion_precaria => 
        afap.numero_afap.toString().includes(query) ||
        afap.solicitante_nombre?.toLowerCase().includes(query) ||
        afap.solicitante_apellido?.toLowerCase().includes(query) ||
        afap.solicitante_cuit_cuil?.includes(query) ||
        afap.titular_nombre?.toLowerCase().includes(query) ||
        afap.titular_cuit?.includes(query) ||
        afap.domicilio_calle?.toLowerCase().includes(query) ||
        afap.domicilio_localidad?.toLowerCase().includes(query) ||
        afap.rubro_tipo?.toLowerCase().includes(query)
      );
    }

    // Ordenamiento
    result.sort((a, b) => {
      let comparison = 0;
      
      switch(sortBy) {
        case 'fecha':
          comparison = new Date(a.fecha_solicitud) - new Date(b.fecha_solicitud);
          break;
        case 'numero':
          comparison = a.numero_afap - b.numero_afap;
          break;
        case 'nombre':
          const nombreA = `${a.solicitante_nombre} ${a.solicitante_apellido}`.toLowerCase();
          const nombreB = `${b.solicitante_nombre} ${b.solicitante_apellido}`.toLowerCase();
          comparison = nombreA.localeCompare(nombreB);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [afaps, filter, searchQuery, sortBy, sortOrder]);

  // Contadores por estado
  const estadosCounts = useMemo(() => {
    return {
      all: afaps.length,
      pendiente: afaps.filter(a => a.estado === 'pendiente').length,
      inspeccion: afaps.filter(a => a.estado === 'inspeccion').length,
      aprobado: afaps.filter(a => a.estado === 'aprobado').length,
      rechazado: afaps.filter(a => a.estado === 'rechazado').length,
    };
  }, [afaps]);

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <ArrowUpDown className="w-4 h-4 text-slate-400" />;
    return sortOrder === 'asc' ? 
      <ArrowUp className="w-4 h-4 text-blue-600" /> : 
      <ArrowDown className="w-4 h-4 text-blue-600" />;
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
      <div data-testid="solicitudes-page" className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Solicitudes Habilitación Precaria</h1>
            <p className="text-slate-600">Gestión y revisión de todas las solicitudes</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar por N° Habilitación Precaria, CUIT, nombre, domicilio, rubro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {[
              { value: 'all', label: 'Todas', icon: null },
              { value: 'pendiente', label: 'Pendientes', icon: Clock },
              { value: 'inspeccion', label: 'En Inspección', icon: ClipboardCheck },
              { value: 'aprobado', label: 'Aprobadas', icon: CheckCircle },
              { value: 'rechazado', label: 'Rechazadas', icon: XCircle }
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === item.value
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-slate-100'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    filter === item.value
                      ? 'bg-blue-700'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {estadosCounts[item.value]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
            <span className="text-sm font-medium text-slate-700">Ordenar por:</span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleSort('fecha')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  sortBy === 'fecha'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                }`}
              >
                Fecha <SortIcon column="fecha" />
              </button>
              <button
                onClick={() => toggleSort('numero')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  sortBy === 'numero'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                }`}
              >
                N° Habilitación Precaria <SortIcon column="numero" />
              </button>
              <button
                onClick={() => toggleSort('nombre')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  sortBy === 'nombre'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                }`}
              >
                Nombre <SortIcon column="nombre" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-slate-600">
            Mostrando <strong>{filteredAndSortedAfaps.length}</strong> de <strong>{afaps.length}</strong> solicitudes
          </div>
        </div>

        {/* Habilitaciones Precarias List */}
        <div className="grid gap-6">
          {filteredAndSortedAfaps.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-slate-900 mb-2">
                No se encontraron solicitudes
              </p>
              <p className="text-slate-600">
                {searchQuery ? 'Intentá con otros términos de búsqueda' : 'No hay solicitudes con este filtro'}
              </p>
            </div>
          ) : (
            filteredAndSortedAfaps.map((afap) => (
              <AFAPCard 
                key={afap.id} 
                habilitacion_precaria={afap} 
                onUpdateEstado={handleUpdateEstado}
                onDownloadCertificate={handleDownloadCertificate}
                isInspector={user?.role === 'inspector' || user?.role === 'administrador'}
              />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const AFAPCard = ({ afap, onUpdateEstado, onDownloadCertificate, isInspector }) => {
  const [showActions, setShowActions] = useState(false);
  const [observaciones, setObservaciones] = useState('');

  return (
    <div
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
              variant="outline"
              size="sm"
              onClick={() => onDownloadCertificate(afap.id, afap.numero_afap)}
              className="gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <Download className="w-4 h-4" />
              Certificado
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowActions(!showActions)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {showActions ? 'Ocultar' : 'Ver Detalles'}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
        <div>
          <p className="text-xs text-slate-500 mb-1">Solicitante</p>
          <p className="text-sm font-medium text-slate-900">
            {afap.solicitante_nombre} {afap.solicitante_apellido}
          </p>
          <p className="text-xs text-slate-600">{afap.solicitante_cuit_cuil}</p>
        </div>

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
          <p className="text-xs text-slate-500 mb-1">Fecha</p>
          <p className="text-sm font-medium text-slate-900">
            {new Date(afap.fecha_solicitud).toLocaleDateString('es-AR')}
          </p>
          <p className="text-xs text-slate-600">{afap.metros_cuadrados} m²</p>
        </div>
      </div>

      {showActions && (
        <div className="mt-4 pt-4 border-t space-y-4">
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Detalles Completos</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600"><strong>Titular:</strong> {afap.titular_nombre}</p>
                <p className="text-slate-600"><strong>CUIT Titular:</strong> {afap.titular_cuit}</p>
                <p className="text-slate-600"><strong>Cuenta ABL:</strong> {afap.cuenta_abl}</p>
              </div>
              <div>
                <p className="text-slate-600"><strong>Trabajadores:</strong> {afap.cantidad_trabajadores}</p>
                <p className="text-slate-600"><strong>Techos:</strong> {afap.techos_cielorasos}</p>
                <p className="text-slate-600"><strong>Pisos:</strong> {afap.pisos_material}</p>
              </div>
            </div>
          </div>

          {isInspector && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cambiar Estado
                </label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateEstado(afap.id, 'inspeccion', 'Programada para inspección')}
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    En Inspección
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateEstado(afap.id, 'aprobado', 'Habilitación Precaria aprobado - Cumple requisitos. Email automático enviado.')}
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    Aprobar y Notificar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateEstado(afap.id, 'rechazado', observaciones || 'No cumple requisitos')}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Rechazar
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Observaciones
                </label>
                <Textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Agregar observaciones..."
                  rows={2}
                />
              </div>
            </div>
          )}

          {afap.observaciones && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Observaciones:</strong> {afap.observaciones}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
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