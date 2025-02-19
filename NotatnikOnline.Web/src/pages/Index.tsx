
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ArrowRight, BookText, Lock, Users, Trash2, Edit2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [editingNote, setEditingNote] = useState<null | { id: string; title: string; content: string; is_public: boolean }>(null);

  const { data: notes, refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    try {
      if (editingNote) {
        const { error } = await supabase
          .from("notes")
          .update({
            title,
            content,
            is_public: isPublic,
          })
          .eq("id", editingNote.id);

        if (error) throw error;

        toast({
          title: "Sukces!",
          description: "Twoja notatka została zaktualizowana.",
        });

        setEditingNote(null);
      } else {
        const { error } = await supabase
          .from("notes")
          .insert([
            {
              title,
              content,
              is_public: isPublic,
              user_id: user.id,
            },
          ]);

        if (error) throw error;

        toast({
          title: "Sukces!",
          description: "Twoja notatka została utworzona.",
        });
      }

      setTitle("");
      setContent("");
      setIsPublic(false);
      refetch();
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać notatki. Spróbuj ponownie.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (noteId: string, noteUserId: string) => {
    if (!user || user.id !== noteUserId) return;

    try {
      const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", noteId);

      if (error) throw error;

      toast({
        title: "Sukces!",
        description: "Notatka została usunięta.",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć notatki. Spróbuj ponownie.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (note: { id: string; title: string; content: string; is_public: boolean }) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content || "");
    setIsPublic(note.is_public || false);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setTitle("");
    setContent("");
    setIsPublic(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        {!user ? (
          <>
            {/* Hero Section */}
            <section className="py-20 text-center animate-fade-down">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Twoje myśli, pięknie uporządkowane
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Minimalistyczne narzędzie do notowania, zaprojektowane z myślą o przejrzystości i prostocie.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="group">
                    <Link to="/auth">
                      Rozpocznij
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/public-notes">Zobacz publiczne notatki</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass p-6 rounded-lg animate-slide-up-fade" style={{ animationDelay: "0ms" }}>
                  <BookText className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Edytor tekstu</h3>
                  <p className="text-gray-600">
                    Twórz piękne notatki za pomocą naszego intuicyjnego edytora. Formatuj treść dokładnie tak, jak chcesz.
                  </p>
                </div>
                <div className="glass p-6 rounded-lg animate-slide-up-fade" style={{ animationDelay: "150ms" }}>
                  <Lock className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Prywatność i bezpieczeństwo</h3>
                  <p className="text-gray-600">
                    Twoje notatki są domyślnie prywatne. Wybierz, co chcesz udostępnić, a co zachować dla siebie.
                  </p>
                </div>
                <div className="glass p-6 rounded-lg animate-slide-up-fade" style={{ animationDelay: "300ms" }}>
                  <Users className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Współpraca</h3>
                  <p className="text-gray-600">
                    Udostępniaj swoje notatki społeczności. Ucz się i rozwijaj razem z innymi.
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="py-10">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">
                {editingNote ? "Edytuj notatkę" : "Utwórz nową notatkę"}
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Tytuł</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Treść</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="public"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                  <Label htmlFor="public">Ustaw notatkę jako publiczną</Label>
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    {editingNote ? "Zapisz zmiany" : "Utwórz notatkę"}
                  </Button>
                  {editingNote && (
                    <Button type="button" variant="outline" onClick={handleCancelEdit}>
                      Anuluj edycję
                    </Button>
                  )}
                </div>
              </form>

              {notes && notes.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Twoje notatki</h2>
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="glass p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{note.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {note.content?.substring(0, 100)}
                              {note.content && note.content.length > 100 ? "..." : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {note.is_public && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                Publiczna
                              </span>
                            )}
                            {user.id === note.user_id && (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleEdit(note)}
                                  className="h-8 w-8"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleDelete(note.id, note.user_id)}
                                  className="h-8 w-8"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
