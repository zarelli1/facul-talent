import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  User, 
  LogOut,
  Bell,
  FileText,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail");
    
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    
    if (email) {
      setUserEmail(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/");
  };

  const quickActions = [
    {
      title: "Minhas Disciplinas",
      description: "Acesse suas matérias",
      icon: BookOpen,
      color: "text-primary"
    },
    {
      title: "Calendário",
      description: "Cronograma acadêmico",
      icon: Calendar,
      color: "text-accent"
    },
    {
      title: "Notas",
      description: "Consulte suas notas",
      icon: FileText,
      color: "text-primary-light"
    },
    {
      title: "Horários",
      description: "Grade de horários",
      icon: Clock,
      color: "text-primary-dark"
    }
  ];

  const notifications = [
    {
      title: "Nova atividade disponível",
      description: "Matemática Aplicada - Exercício 5",
      time: "2h atrás"
    },
    {
      title: "Lembrete: Prova amanhã",
      description: "História do Brasil - Sala 205",
      time: "5h atrás"
    },
    {
      title: "Material disponível",
      description: "Física Quântica - Slides da aula 10",
      time: "1 dia atrás"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Portal Acadêmico</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{userEmail}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo de volta!
          </h2>
          <p className="text-muted-foreground">
            Aqui está um resumo das suas atividades acadêmicas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Acesso Rápido</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-academic transition-all duration-200 cursor-pointer border-0 bg-gradient-card hover:scale-105"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                        <CardTitle className="text-base">{action.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{action.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Academic Info */}
            <Card className="border-0 bg-gradient-card shadow-academic">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Informações Acadêmicas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">8</div>
                    <div className="text-sm text-muted-foreground">Disciplinas</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent">8.5</div>
                    <div className="text-sm text-muted-foreground">Média Geral</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-light">5º</div>
                    <div className="text-sm text-muted-foreground">Período</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Notificações</h3>
            <Card className="border-0 bg-gradient-card shadow-academic">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span>Recentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="border-b border-border/50 last:border-0 pb-3 last:pb-0">
                    <h4 className="font-medium text-sm text-foreground mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      {notification.description}
                    </p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;