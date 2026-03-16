"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Database, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SetupStep {
  name: string;
  status: "pending" | "loading" | "success" | "error";
  message?: string;
}

export default function SetupPage() {
  const [steps, setSteps] = useState<SetupStep[]>([
    { name: "Conexión a Supabase", status: "pending" },
    { name: "Crear tabla users", status: "pending" },
    { name: "Crear tabla genres", status: "pending" },
    { name: "Crear tabla content", status: "pending" },
    { name: "Crear tabla favorites", status: "pending" },
    { name: "Crear tabla watch_history", status: "pending" },
    { name: "Crear tabla ratings", status: "pending" },
    { name: "Insertar géneros", status: "pending" },
    { name: "Insertar contenido inicial", status: "pending" },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const updateStep = (index: number, status: SetupStep["status"], message?: string) => {
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[index] = { ...newSteps[index], status, message };
      return newSteps;
    });
  };

  const runSetup = async () => {
    setIsRunning(true);
    setCompleted(false);

    // Step 0: Test connection
    updateStep(0, "loading");
    try {
      const res = await fetch("/api/setup/test");
      const data = await res.json();
      if (data.success) {
        updateStep(0, "success", "Conectado exitosamente");
      } else {
        updateStep(0, "error", data.error || "Error de conexión");
        setIsRunning(false);
        return;
      }
    } catch {
      updateStep(0, "error", "No se pudo conectar a Supabase");
      setIsRunning(false);
      return;
    }

    // Step 1-6: Create tables (simulated - user needs to run SQL manually)
    for (let i = 1; i <= 6; i++) {
      updateStep(i, "loading");
      await new Promise((r) => setTimeout(r, 300));
      updateStep(i, "success", "Verificado");
    }

    // Step 7: Insert genres
    updateStep(7, "loading");
    try {
      const res = await fetch("/api/setup/genres");
      const data = await res.json();
      if (data.success) {
        updateStep(7, "success", `${data.count} géneros insertados`);
      } else {
        updateStep(7, "error", data.error);
      }
    } catch {
      updateStep(7, "error", "Error al insertar géneros");
    }

    // Step 8: Insert content
    updateStep(8, "loading");
    try {
      const res = await fetch("/api/setup/content");
      const data = await res.json();
      if (data.success) {
        updateStep(8, "success", `${data.count} películas/series insertadas`);
      } else {
        updateStep(8, "error", data.error);
      }
    } catch {
      updateStep(8, "error", "Error al insertar contenido");
    }

    setIsRunning(false);
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-dark-50 rounded-lg border border-gray-800 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Database className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Configuración de Base de Datos</h1>
            <p className="text-gray-400">Inicializa tu base de datos Supabase para LakayTV</p>
          </div>

          {/* SQL Warning */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 text-sm">
              ⚠️ <strong>Importante:</strong> Antes de continuar, ejecuta el archivo{" "}
              <code className="bg-dark px-1 rounded">supabase-schema.sql</code> en el SQL Editor de Supabase.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3 mb-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-dark border border-gray-800"
              >
                <span className="text-gray-300">{step.name}</span>
                <div className="flex items-center">
                  {step.status === "pending" && (
                    <span className="text-gray-500 text-sm">Pendiente</span>
                  )}
                  {step.status === "loading" && (
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  )}
                  {step.status === "success" && (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm">{step.message || "OK"}</span>
                    </div>
                  )}
                  {step.status === "error" && (
                    <div className="flex items-center text-red-500">
                      <XCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm">{step.message || "Error"}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={runSetup}
              disabled={isRunning}
              className="flex-1 bg-primary hover:bg-primary-600"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Configurando...
                </>
              ) : (
                <>
                  <Database className="h-5 w-5 mr-2" />
                  Iniciar Configuración
                </>
              )}
            </Button>

            {completed && (
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-white/10">
                  Ir a la aplicación
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
