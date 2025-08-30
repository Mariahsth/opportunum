import { TextField, Grid, Button, Box, MenuItem } from "@mui/material";
import { EditIcon, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { IProject } from "../interface/Project";
import { updateProject } from "../services/projectsService";
import { useAuth } from "../hooks/useAuth";
import { formatDateForInput } from "../utils/formatDate";
import { municipios } from "../utils/municipios";

const labels = [
  { key: "perspectiva", label: "Perspectiva/Eixo" },
  { key: "numeroEstrategia", label: "Nº da Estratégia" },
  { key: "resultadoChave", label: "Resultado chave" },
  { key: "municipio", label: "Município" },
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
  const { refreshProjects, user } = useAuth();

  const [formData, setFormData] = useState({
    perspectiva: "",
    numeroEstrategia: "",
    resultadoChave: "",
    objetivo: "",
    objetivoEstrategico: "",
    estrategia: "",
    prazo: "",
    responsavel: "",
    municipio: "",
  });

  const isMaster = user?.roles.includes("master");
  const isAdmin = user?.roles.includes("admin");

  useEffect(() => {
    setFormData({
      perspectiva: project.perspectiva || "",
      numeroEstrategia: project.numeroEstrategia || "",
      resultadoChave: project.resultadoChave || "",
      objetivo: project.objetivo || "",
      objetivoEstrategico: project.objetivoEstrategico || "",
      estrategia: project.estrategia || "",
      prazo: formatDateForInput(project.prazo) || "",
      responsavel: project.responsavel || "",
      municipio: project.municipio || "",
    });

    setSalvo(true);
  }, [project]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const projectData = {
        ...formData,
        prazo: formData.prazo ? `${formData.prazo}T00:00:00` : undefined,
      };
      await updateProject(project._id, projectData);
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
    setSalvo(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        {labels.map(({ key, label }, index) => (
          <Grid
            key={key}
            size={{ xs: 12, sm: index === 4 || index === 5 || index ===6 ? 12 : 6 }}
          >
            <TextField
              fullWidth
              select={label === "Município"}
              label={label}
              disabled={salvo}
              variant="outlined"
              type={label === "Prazo" ? "date" : "text"}
              multiline={label !== "Prazo"}
              value={formData[key as keyof typeof formData]}
              onChange={(e) => handleChange(key, e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {label === "Município" &&
                municipios.map((mun) => (
                  <MenuItem key={mun} value={mun}>
                    {mun}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        ))}

      </Grid>

      {(isMaster || isAdmin) && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            loading={loading}
            startIcon={<SaveIcon />}
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Salvar
          </Button>
          <Button
            loading={loading}
            startIcon={<EditIcon />}
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleEdit}
          >
            Editar
          </Button>
        </Box>
      )}
    </>
  );
}
