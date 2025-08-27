import {
  TextField,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { EditIcon, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { IProject } from "../interface/Project";
import { updateProject } from "../services/projectsService";
import { useAuth } from "../hooks/useAuth";

const labels = [
  { key: "perspectiva", label: "Perspectiva/Eixo" },
  { key: "numeroEstrategia", label: "Nº da Estratégia" },
  { key: "resultadoChave", label: "Resultado chave" },
  { key: "objetivo", label: "Objetivo" },
  { key: "objetivoEstrategico", label: "Objetivo Estratégico" },
  { key: "estrategia", label: "Estratégia" },
  { key: "prazo", label: "Prazo" },
  { key: "responsavel", label: "Responsável" },
];

interface FormProps {
  project: IProject;
}

export default function Form({ project }: FormProps) {
    const [loading, setLoading] = useState(false);
    const [salvo, setSalvo] = useState(true);
    const { refreshProjects } = useAuth();
    const [formData, setFormData] = useState({
      perspectiva: "",
      numeroEstrategia: "",
      resultadoChave: "",
      objetivo: "",
      objetivoEstrategico: "",
      estrategia: "",
      prazo: "",
      responsavel: "",
    });
    useEffect(() => {
      setFormData({
        perspectiva: project.perspectiva || "",
        numeroEstrategia: project.numeroEstrategia || "",
        resultadoChave: project.resultadoChave || "",
        objetivo: project.objetivo || "",
        objetivoEstrategico: project.objetivoEstrategico || "",
        estrategia: project.estrategia || "",
        prazo: project.prazo || "",
        responsavel: project.responsavel || "",
      });
    
      setSalvo(true); 
    }, [project]);



    const handleChange = (key: string, value: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
      setLoading(true);
      try {
        await updateProject(project._id, formData);
        await refreshProjects();
        setSalvo(true);
      } catch (error) {
        console.error("Erro ao salvar projeto:", error);
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    const handleEdit = () => {
        setSalvo(false)
    }

  return (
    <>
      <Grid container spacing={2}>
        {labels.map(({ key, label }, index) => (
          <Grid key={key} size={{ xs: 12, sm: index === 4 || index === 5 ? 12 : 6 }} >
            <TextField
              fullWidth
              label={label}
              disabled={salvo}
              variant="outlined"
              type={label === "Prazo" ? "date" : "text"}
              multiline = {label !== "Prazo"}
              value={formData[key as keyof typeof formData]}
              onChange={(e) => handleChange(key, e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{display:'flex', gap:2}}>
        <Button
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            color="success"
            sx={{mt:2}}
            onClick={() => handleSave()}
            >
            Salvar
            </Button>
        <Button
            loading={loading}
            loadingPosition="start"
            startIcon={<EditIcon />}
            variant="contained"
            sx={{mt:2}}
            onClick={() => handleEdit()}
            >
            Editar
            </Button>

      </Box>
    </>
  );
}
