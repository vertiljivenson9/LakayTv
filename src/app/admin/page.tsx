"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Plus, Edit, Trash2, Search, Film, Tv, 
  FileVideo, Users, BarChart3, Settings, Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contents } from "@/data/content";

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContent = contents.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: contents.length,
    movies: contents.filter((c) => c.category === "movie").length,
    series: contents.filter((c) => c.category === "series").length,
    documentaries: contents.filter((c) => c.category === "documentary").length,
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
              <h1 className="text-2xl md:text-3xl font-bold text-white">Administration</h1>
              <p className="text-gray-400">Gérer le contenu LakayTV</p>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary-600">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter du contenu
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Film className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Film className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Films</p>
                  <p className="text-2xl font-bold text-white">{stats.movies}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Tv className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Séries</p>
                  <p className="text-2xl font-bold text-white">{stats.series}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <FileVideo className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Documentaires</p>
                  <p className="text-2xl font-bold text-white">{stats.documentaries}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/upload">
            <Card className="bg-dark-50 border-gray-800 hover:border-primary transition-colors cursor-pointer">
              <CardContent className="flex items-center justify-center py-6">
                <Upload className="h-6 w-6 text-primary mr-2" />
                <span className="text-white">Uploader</span>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/users">
            <Card className="bg-dark-50 border-gray-800 hover:border-primary transition-colors cursor-pointer">
              <CardContent className="flex items-center justify-center py-6">
                <Users className="h-6 w-6 text-primary mr-2" />
                <span className="text-white">Utilisateurs</span>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/analytics">
            <Card className="bg-dark-50 border-gray-800 hover:border-primary transition-colors cursor-pointer">
              <CardContent className="flex items-center justify-center py-6">
                <BarChart3 className="h-6 w-6 text-primary mr-2" />
                <span className="text-white">Analytique</span>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/settings">
            <Card className="bg-dark-50 border-gray-800 hover:border-primary transition-colors cursor-pointer">
              <CardContent className="flex items-center justify-center py-6">
                <Settings className="h-6 w-6 text-primary mr-2" />
                <span className="text-white">Paramètres</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher du contenu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-dark-50 border-gray-700 text-white"
            />
          </div>
        </div>

        {/* Content Table */}
        <Card className="bg-dark-50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Contenu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-gray-400 font-medium py-3 px-2">Titre</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-2">Catégorie</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-2">Genre</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-2">Année</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-2">Note</th>
                    <th className="text-right text-gray-400 font-medium py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContent.map((content) => (
                    <tr key={content.id} className="border-b border-gray-800 hover:bg-dark-100">
                      <td className="py-3 px-2">
                        <span className="text-white">{content.title}</span>
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-dark rounded text-gray-300 text-sm">
                          {content.category}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray-400">{content.genre}</td>
                      <td className="py-3 px-2 text-gray-400">{content.year}</td>
                      <td className="py-3 px-2 text-gray-400">{content.rating}</td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
