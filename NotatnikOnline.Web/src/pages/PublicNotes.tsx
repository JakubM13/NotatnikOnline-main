
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PublicNotes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { data: publicNotes, isLoading, refetch } = useQuery({
    queryKey: ["public-notes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Publiczne Notatki</h1>
        
        {isLoading ? (
          <div className="text-center">Ładowanie...</div>
        ) : publicNotes && publicNotes.length > 0 ? (
          <div className="grid gap-6">
            {publicNotes.map((note) => (
              <div key={note.id} className="glass p-6 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                    <p className="text-gray-600">{note.content}</p>
                    <div className="text-sm text-gray-500 mt-4">
                      {new Date(note.created_at).toLocaleDateString("pl-PL")}
                    </div>
                  </div>
                  {user && user.id === note.user_id && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(note.id, note.user_id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            Nie znaleziono żadnych publicznych notatek.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PublicNotes;
