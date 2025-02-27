import React, { useState } from "react";
import { Grid,Card,CardContent,Typography,TextField,Button,IconButton,} from "@mui/material";
import { Edit, Delete, PushPin } from "@mui/icons-material";

const NotesMain = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddNote = () => {
    if (newNote.title && newNote.description) {
      setNotes([...notes, newNote]);
      setNewNote({ title: "", description: "" });
    }
  };

  const handleEditNote = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setNewNote({
      title: notes[index].title,
      description: notes[index].description,
    });
  };

  const handleSaveEdit = () => {
    const updatedNotes = [...notes];
    updatedNotes[currentIndex] = newNote;
    setNotes(updatedNotes);
    setIsEditing(false);
    setCurrentIndex(null);
    setNewNote({ title: "", description: "" });
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, idx) => idx !== index);
    setNotes(updatedNotes);
  };

  const handlePinNote = (index) => {
    const updatedNotes = [...notes];
    const pinnedNote = updatedNotes.splice(index, 1)[0];
    updatedNotes.unshift(pinnedNote); // Move to the top
    setNotes(updatedNotes);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" >
        Notes
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={newNote.description}
            onChange={(e) =>
              setNewNote({ ...newNote, description: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={isEditing ? handleSaveEdit : handleAddNote}
          >
            {isEditing ? "Save Edit" : "Add Note"}
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {notes.map((note, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography>{note.description}</Typography>
                <div style={{ marginTop: "10px" }}>
                  <IconButton
                    color="secondary"
                    onClick={() => handleEditNote(index)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteNote(index)}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    onClick={() => handlePinNote(index)}
                  >
                    <PushPin />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NotesMain;
