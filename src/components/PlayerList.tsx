import React, {useState, useEffect} from 'react'
import {Table, TableBody, TableRow, TableCell, TableHead, TableSortLabel, Modal, Tooltip} from '@material-ui/core/';
import {makeStyles} from '@material-ui/styles'

import '../App.css';
import SpecificStats from './SpecificStats';

export class Player {
    name: string;
    deaths: number = 0;
    kills: number = 0;
    exits: number = 0;
    [key: string] : number | string;
    constructor(name: string, properties?: any){
      if(properties){
        for(let prop in properties){
          if(!isNaN(properties[prop]))
            this[prop] = parseInt(properties[prop]);
          else
            this[prop] = properties[prop];
        }
      }
      this.name = name;
    }
}

export type PlayersPropType = {
    players: Player[]
}

function asc(a: any, b: any) : number{
  if(a > b){
    return 1;
  }
  else if(a < b){
    return -1;
  }
  return 0;
}

function desc(a: any, b: any) : number{
  if(a < b){
    return 1;
  }
  else if(a > b){
    return -1;
  }
  return 0;
}

const useStyles = makeStyles({
  root: {
    fontSize: '1.3em',
    color: 'orange'
  }
});

type OrderTypes = "asc" | "desc" | undefined;
const PlayerList = (props: PlayersPropType) => {
    const styles = useStyles();
    const [orderBy, setOrderBy] = useState<OrderTypes>("desc");
    const [selection, setSelection] = useState("kills");
    const [userOpen, setUserOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<Player>();

    function compareValues(a: Player, b: Player, sortType: OrderTypes) : number {
      return sortType === "asc" ? asc(a[selection], b[selection]) : desc(a[selection], b[selection]);
    }

    function displayUserInfo(playerName : string){
      let player = props.players.find(player => player.name === playerName);
      if(player){
        setUserOpen(true);
        setSelectedPlayer(player);
      }
    }

    useEffect(() => {
      if(selectedPlayer){
        let player = props.players.find(player => player.name === selectedPlayer.name);
        setSelectedPlayer(player ? player : undefined);
      }
    }, [props.players]);

    function handleSortClick(type: string){
      if(type === selection) setOrderBy(orderBy === "asc" ? "desc" : "asc");
      else {
        setOrderBy("desc");
        setSelection(type);
      } 
    }
    return (
      <div className="PlayerStats">
        {userOpen && <SpecificStats player={selectedPlayer} openFunction={setUserOpen} />}
        <Table>
          <TableHead>
            <TableCell className={styles.root}>
              Username
            </TableCell>
            <TableCell sortDirection={orderBy}>
              <TableSortLabel className={styles.root} active={selection === "kills"} direction={orderBy} onClick={() => handleSortClick("kills")}>
                Monster Kills
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy}>
              <TableSortLabel className={styles.root} active={selection === "deaths"} direction={orderBy} onClick={() => handleSortClick("deaths")}>
                Deaths
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy}>
              <TableSortLabel className={styles.root} active={selection === "exits"} direction={orderBy} onClick={() => handleSortClick("exits")}>
                Finished Maps
              </TableSortLabel>
            </TableCell>
          </TableHead>
          <TableBody>
            {props.players.sort((a, b) => compareValues(a, b, orderBy)).map(player => 
              <TableRow key={player.name} onClick={() => displayUserInfo(player.name)}>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.kills}</TableCell>
                <TableCell>{player.deaths}</TableCell>
                <TableCell>{player.exits}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
}

export default PlayerList;