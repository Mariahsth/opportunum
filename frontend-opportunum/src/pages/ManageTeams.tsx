import {
  Box,
  Toolbar,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { User } from "../interface/User";
import { Ban, EditIcon, SaveIcon, Trash } from "lucide-react";
import {
  updateUser,
  deleteUser as deleteUserService,
} from "../services/userService";
import type { IProject } from "../interface/Project";

export default function ManageTeams() {
  const {
    user,
    loading,
    availableRoles,
    users: equipe,
    setUsers,
    projects,
  } = useAuth();
  const [modoEdicao, setModoEdicao] = useState<Record<string, boolean>>({});
  const [valoresEditados, setValoresEditados] = useState<
    Record<string, Partial<User>>
  >({});
  const isMaster = user?.roles?.includes("master");

  const handleSave = async (id: string) => {
    setModoEdicao((prev) => ({ ...prev, [id]: false }));
    const dadosAtualizados = valoresEditados[id];

    try {
      const userAtualizado = await updateUser(id, {
        roles: dadosAtualizados.roles,
        projects: dadosAtualizados.projects?.map((proj) =>
          typeof proj === "string" ? proj : proj._id
        ),
      });

      setValoresEditados((prev) => {
        const novo = { ...prev };
        delete novo[id];
        return novo;
      });

      setUsers((prev) =>
        prev.map((membro) =>
          membro._id === id ? { ...membro, ...userAtualizado } : membro
        )
      );
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const handleEdit = (id: string) => {
    setModoEdicao((prev) => ({ ...prev, [id]: true }));

    const membro = equipe.find((m) => m._id === id);
    if (membro) {
      setValoresEditados((prev) => ({
        ...prev,
        [id]: {
          roles: membro.roles,
          projects: membro.projects,
        },
      }));
    }
  };

  const handleChange = (
    id: string,
    campo: keyof User,
    valor: string | string[]
  ) => {
    setValoresEditados((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [campo]: valor,
      },
    }));
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar este usuário?"
    );
    if (!confirm) return;

    try {
      await deleteUserService(id);
      setUsers((prev) => prev.filter((membro) => membro._id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };
  return (
    <Box>
      <Toolbar />
      <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>
        Gerenciar Equipe
      </Typography>
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />

      <Card>
        <CardContent>
          <Typography sx={{fontSize:'2rem', mb:2}}>Olá, {user?.name}</Typography>
          <Box sx={{display:'flex', gap:'0.5rem'}}>
            <Typography>Seu perfil é:  </Typography>
            <Typography sx={{color:'primary.main'}}> {user?.roles}</Typography>

          </Box>
          <Typography>
            Você tem {equipe.filter((m) => m._id !== user?._id).length} membros
            na sua equipe
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {equipe.map((membro) => {
          const emEdicao = modoEdicao[membro._id];
          const valores = valoresEditados[membro._id] || {};
          return (
            <Grid size={{ xs: 12, lg: 6 }} key={membro._id}>
              <Card sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <Box>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Typography>Nome: </Typography>
                      <Typography>
                        {membro.name} {membro._id === user?._id && "(você)"}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Typography>Email:</Typography>
                      <Typography>{membro.email}</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Tipo de acesso:</Typography>
                      {emEdicao ? (
                        isMaster ? (
                          <FormControl size="small">
                            <Select
                              value={valores.roles?.[0] || ""}
                              onChange={(e) =>
                                handleChange(membro._id, "roles", [
                                  e.target.value,
                                ])
                              }
                              displayEmpty
                              sx={{ minWidth: 160 }}
                            >
                              {availableRoles.map((tipo) => (
                                <MenuItem key={tipo} value={tipo}>
                                  {tipo}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography>
                            {Array.isArray(membro.roles)
                              ? membro.roles.join(", ")
                              : membro.roles}
                          </Typography>
                        )
                      ) : (
                        <Typography>
                          {Array.isArray(membro.roles)
                            ? membro.roles.join(", ")
                            : membro.roles}
                        </Typography>
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Projetos:</Typography>
                      {emEdicao ? (
                        <FormControl size="small">
                          <Select
                            multiple
                            value={
                              (valores.projects?.map(
                                (proj: IProject | string) =>
                                  typeof proj === "string" ? proj : proj._id
                              ) as string[]) || []
                            }
                            onChange={(e) =>
                              handleChange(
                                membro._id,
                                "projects",
                                e.target.value as string[]
                              )
                            }
                            sx={{ minWidth: 160 }}
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 0.5,
                                }}
                              >
                                {(selected as string[]).map((value) => {
                                  const projeto = projects.find(
                                    (p) => p._id === value
                                  );
                                  return (
                                    <Typography key={value} variant="body2">
                                      {projeto?.title || value}
                                    </Typography>
                                  );
                                })}
                              </Box>
                            )}
                          >
                            {projects.map((project) => (
                              <MenuItem key={project._id} value={project._id}>
                                {project.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <Typography>
                          {(membro.projects || [])
                            .map((proj: string | IProject) => {
                              const id =
                                typeof proj === "string" ? proj : proj._id;
                              const found = projects.find((p) => p._id === id);
                              return found?.title;
                            })
                            .filter(Boolean)
                            .join(", ")}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {emEdicao ? (
                      <>
                        <Button
                          loading={loading}
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="contained"
                          color="success"
                          onClick={() => handleSave(membro._id)}
                        >
                          Salvar
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          startIcon={<Ban />}
                          sx={{ mt: 2 }}
                          onClick={() =>
                            setModoEdicao((prev) => ({
                              ...prev,
                              [membro._id]: false,
                            }))
                          }
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          loading={loading}
                          loadingPosition="start"
                          startIcon={<EditIcon />}
                          variant="contained"
                          onClick={() => handleEdit(membro._id)}
                        >
                          Editar
                        </Button>
                        <Button
                          loading={loading}
                          loadingPosition="start"
                          startIcon={<Trash />}
                          variant="contained"
                          color="error"
                          sx={{ mt: 2 }}
                          onClick={() => handleDelete(membro._id)}
                        >
                          Deletar
                        </Button>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
