"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Plus, Film, DollarSign, Eye, TrendingUp,
  Upload, BarChart3, Settings, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ProducerPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    genre: "",
    year: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Submitting:", formData);
    alert("Film soumis avec succès! (Mode démo)");
  };

  const stats = {
    films: 3,
    views: 12500,
    revenue: 1250,
    rating: 4.5,
  };

  return (
    <div className="min-h-screen bg-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Espace Producteur</h1>
              <p className="text-gray-400">Gérez et publiez vos films sur LakayTV</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Film className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mes Films</p>
                  <p className="text-2xl font-bold text-white">{stats.films}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Vues</p>
                  <p className="text-2xl font-bold text-white">{stats.views.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Revenus (HTG)</p>
                  <p className="text-2xl font-bold text-white">{stats.revenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Note Moyenne</p>
                  <p className="text-2xl font-bold text-white">{stats.rating}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submit New Film */}
          <Card className="bg-dark-50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="h-5 w-5 mr-2 text-primary" />
                Soumettre un nouveau film
              </CardTitle>
              <CardDescription className="text-gray-400">
                Remplissez le formulaire ci-dessous pour soumettre votre film
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Titre du film</label>
                  <Input
                    type="text"
                    placeholder="Ex: Mon Film Haïtien"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-dark border-gray-700 text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Description</label>
                  <textarea
                    placeholder="Décrivez votre film..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full h-24 px-3 py-2 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-1">URL YouTube</label>
                  <Input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="bg-dark border-gray-700 text-white"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Genre</label>
                    <select
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md text-white"
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="Drame">Drame</option>
                      <option value="Comédie">Comédie</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Romance">Romance</option>
                      <option value="Action">Action</option>
                      <option value="Documentaire">Documentaire</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Année</label>
                    <Input
                      type="number"
                      placeholder="2024"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="bg-dark border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Soumettre le film
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Creator Program */}
            <Card className="bg-gradient-to-br from-primary/20 to-dark-50 border-gray-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-white mb-2">Programme Créateurs LakayTV</h3>
                <p className="text-gray-300 mb-4">
                  Rejoignez notre programme de créateurs et bénéficiez d&apos;avantages exclusifs: 
                  partage des revenus, promotion de vos films, et accès à des ressources de production.
                </p>
                <ul className="space-y-2 text-gray-300 mb-4">
                  <li className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                    Partage des revenus à 70%
                  </li>
                  <li className="flex items-center">
                    <Eye className="h-4 w-4 text-blue-500 mr-2" />
                    Promotion sur les réseaux sociaux
                  </li>
                  <li className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-purple-500 mr-2" />
                    Support dédié
                  </li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary-600">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-dark-50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-dark">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytique
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-dark">
                  <Film className="h-4 w-4 mr-2" />
                  Mes Films
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-dark">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-dark">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-dark-50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Conseils pour les créateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Utilisez des miniatures de haute qualité pour attirer plus de spectateurs
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Écrivez des descriptions détaillées pour améliorer le référencement
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Partagez vos films sur les réseaux sociaux pour augmenter votre audience
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
