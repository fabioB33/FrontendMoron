import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { CheckCircle, XCircle, Calendar, MapPin, Building2, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export const VerificarCertificadoPage = () => {
  const { afapId } = useParams();
  const [habilitacion_precaria, setAfap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (afapId) {
      loadAfap();
    }
  }, [afapId]);

  const loadAfap = async () => {
    try {
      // Endpoint público para verificar certificado
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/verificar/${afapId}`
      );
      setAfap(response.data);
    } catch (error) {
      console.error('Error loading Habilitación Precaria:', error);
      setError(error.response?.data?.detail || 'Error al verificar el certificado');
    } finally {
      setLoading(false);
    }
  };

  const isVencido = () => {
    if (!habilitacion_precaria?.fecha_vencimiento) return false;
    return new Date(habilitacion_precaria.fecha_vencimiento) < new Date();
  };

  const getEstadoBadge = () => {
    if (error) {
      return (
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-100 border-2 border-red-300 rounded-xl">
          <XCircle className="w-6 h-6 text-red-600" />
          <span className="text-lg font-bold text-red-900">CERTIFICADO NO VÁLIDO</span>
        </div>
      );
    }

    if (isVencido()) {
      return (
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 border-2 border-amber-300 rounded-xl">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          <span className="text-lg font-bold text-amber-900">CERTIFICADO VENCIDO</span>
        </div>
      );
    }

    if (habilitacion_precaria?.estado === 'aprobado') {
      return (
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-100 border-2 border-emerald-300 rounded-xl">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
          <span className="text-lg font-bold text-emerald-900">✓ CERTIFICADO VÁLIDO</span>
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 border-2 border-slate-300 rounded-xl">
        <XCircle className="w-6 h-6 text-slate-600" />
        <span className="text-lg font-bold text-slate-900">CERTIFICADO NO APROBADO</span>
      </div>
    );
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Verificando certificado...</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-[60vh] py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Verificación de Certificado de Habilitación Precaria
            </h1>
            <p className="text-lg text-slate-600">
              Argentina - Sistema de Habilitaciones
            </p>
          </div>

          {/* Estado Badge */}
          <div className="flex justify-center mb-8">
            {getEstadoBadge()}
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
              <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-900 mb-2">Certificado no encontrado</h2>
              <p className="text-red-700 mb-4">{error}</p>
              <p className="text-sm text-red-600">Verificá el código QR o contactá con la municipalidad</p>
            </div>
          )}

          {/* Habilitación Precaria Details */}
          {habilitacion_precaria && (
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
              {/* Header del certificado */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Habilitación Precaria #{habilitacion_precaria.numero_afap}</h2>
                    <p className="text-blue-100">Autorización de Funcionamiento Automático Precaria</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-100">Estado</p>
                    <p className="text-xl font-bold">{habilitacion_precaria.estado.toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Titular */}
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                  <Building2 className="w-6 h-6 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 mb-1">Titular</p>
                    <p className="text-lg font-bold text-slate-900">{habilitacion_precaria.titular_nombre}</p>
                    <p className="text-sm text-slate-600">CUIT: {habilitacion_precaria.titular_cuit}</p>
                  </div>
                </div>

                {/* Domicilio */}
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 mb-1">Domicilio del Comercio</p>
                    <p className="text-lg font-bold text-slate-900">
                      {habilitacion_precaria.domicilio_calle} {habilitacion_precaria.domicilio_altura}
                    </p>
                    {habilitacion_precaria.domicilio_local && (
                      <p className="text-sm text-slate-600">Local: {habilitacion_precaria.domicilio_local}</p>
                    )}
                    <p className="text-sm text-slate-600">{habilitacion_precaria.domicilio_localidad}, Buenos Aires</p>
                  </div>
                </div>

                {/* Actividad */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm font-medium text-slate-600 mb-2">Actividad Comercial</p>
                  <p className="text-base font-semibold text-slate-900 mb-1">{habilitacion_precaria.rubro_tipo}</p>
                  <p className="text-sm text-slate-700">{habilitacion_precaria.rubro_descripcion}</p>
                  <p className="text-sm text-slate-600 mt-2">Superficie: {habilitacion_precaria.metros_cuadrados} m²</p>
                </div>

                {/* Fechas */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <p className="text-sm font-medium text-blue-900">Fecha de Emisión</p>
                    </div>
                    <p className="text-lg font-bold text-blue-900">
                      {new Date(habilitacion_precaria.fecha_solicitud).toLocaleDateString('es-AR')}
                    </p>
                  </div>

                  <div className={`p-4 border rounded-xl ${
                    isVencido() ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className={`w-5 h-5 ${isVencido() ? 'text-red-600' : 'text-emerald-600'}`} />
                      <p className={`text-sm font-medium ${isVencido() ? 'text-red-900' : 'text-emerald-900'}`}>
                        Fecha de Vencimiento
                      </p>
                    </div>
                    <p className={`text-lg font-bold ${isVencido() ? 'text-red-900' : 'text-emerald-900'}`}>
                      {new Date(habilitacion_precaria.fecha_vencimiento).toLocaleDateString('es-AR')}
                    </p>
                    {isVencido() && (
                      <p className="text-xs text-red-700 mt-1">Este certificado ha vencido</p>
                    )}
                  </div>
                </div>

                {/* Observaciones */}
                {habilitacion_precaria.observaciones && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm font-medium text-blue-900 mb-2">Observaciones</p>
                    <p className="text-sm text-blue-800">{habilitacion_precaria.observaciones}</p>
                  </div>
                )}

                {/* Advertencia legal */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-xs font-medium text-amber-900 mb-2">⚠️ IMPORTANTE</p>
                  <ul className="text-xs text-amber-800 space-y-1">
                    <li>• Esta autorización tiene carácter PRECARIO y validez de 30 días</li>
                    <li>• Permite el inicio de actividades mientras se tramita la habilitación definitiva</li>
                    <li>• Debe exhibirse en lugar visible del establecimiento</li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-slate-50 px-8 py-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 text-center">
                  Verificación realizada el {new Date().toLocaleString('es-AR')}
                </p>
                <p className="text-xs text-slate-500 text-center mt-1">
                  Para más información: habilitaciones@argentina.gob.ar
                </p>
              </div>
            </div>
          )}

          {/* Info adicional */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              ¿Dudas sobre la validez? Contactá con la Dirección de Habilitaciones
            </p>
            <p className="text-sm text-slate-600">
              Tel: +54 11 0000-0000 | Email: habilitaciones@argentina.gob.ar
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};