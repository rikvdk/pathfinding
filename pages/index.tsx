import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Board from "../components/Board";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    select: {
      color: "#fff",
      minWidth: 80,
      "&:before": {
        borderColor: "#fff",
      },
      "&:after": {
        borderColor: "#fff",
      },
       "&:hover:not(.Mui-disabled):before": {
           borderColor: "#fff",
       }
    },
    icon: {
      fill: "#fff",
    },
    slider: {
      color: "#fff",
      minWidth: 80,
    },
  }),
);

export default function Index() {
  const classes = useStyles();
  const [algorithm, setAlgorithm] = useState("A*");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAlgorithm(event.target.value as string);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Pathfinding
            </Typography>

            <FormControl>
              <Select
                className={classes.select}
                inputProps={{classes: { icon: classes.icon }}}
                value={algorithm}
                onChange={handleChange}
              >
                <MenuItem value="A*">A*</MenuItem>
                <MenuItem value="BFS">BFS</MenuItem>
                <MenuItem value="DFS">DFS</MenuItem>
                <MenuItem value="Dijkstra">Dijkstra</MenuItem>
              </Select>
            </FormControl>
            <IconButton color="inherit" aria-label="delete">
              <PlayArrowIcon />
            </IconButton>
            <FormControl>
              <Slider min={0} max={100} className={classes.slider} />
            </FormControl>
          </Toolbar>
        </AppBar>
      </div>
      <Board />
    </>
  );
}
