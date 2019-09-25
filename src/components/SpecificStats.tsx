import React, {useState, useEffect} from 'react';
import {Table, TableBody, TableCell, TableRow, Tooltip} from '@material-ui/core';
import { Player } from './PlayerList';
import axios from 'axios';

import runePicture from '../assets/rune.png';
import deadLeg from '../assets/legdead.png';
import boss from '../assets/boss.png';
import map from '../assets/map.png';
import loading from '../assets/loading.gif';

type SpecificStatsPropsType = {
    player: Player | undefined,
    openFunction: Function
}

async function getUserImage(name: string){
    let jsonImageUrl = await axios(`/stats/avatar?user=${name}`);
    return jsonImageUrl.data.imageUrl;
}

export default function SpecificStats(props : SpecificStatsPropsType) {

  const [userImage, setUserImage] = useState(loading);

  useEffect(() => {
    props.player && getUserImage(props.player.name).then(url => setUserImage(url));
  }, [])

  return (
    <div className="ModalBlock" onClick={(event) => {event.stopPropagation(); props.openFunction(false)}}>
        <div style={{outline: 'none'}}>
        <div className="Dialog Stats">
            <header>
            <h2>{props.player && props.player.name}</h2>
            </header>
            <div className="UserPicture">
            <img src={userImage}></img>
            </div>
            <div className="DeepStats">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                            <Tooltip title="Legendaries Killed" placement="right">
                                <div className="ImageWrapper">
                                    <img src={deadLeg}></img>
                                </div>
                            </Tooltip>
                            </TableCell>
                            <TableCell>
                                {props.player ? props.player.legkills : 0}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                            <Tooltip title="Runes Obtained" placement="right">
                                <div className="ImageWrapper">
                                    <img src={runePicture}></img>
                                </div>
                            </Tooltip>
                            </TableCell>
                            <TableCell>
                                {props.player ? props.player.runepickups : 0}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                            <Tooltip title="Bosses Slain" placement="right">
                                <div className="ImageWrapper">
                                    <img src={boss}></img>
                                </div>
                            </Tooltip>
                            </TableCell>
                            <TableCell>
                                {props.player ? props.player.bosskills : 0}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                            <Tooltip title="Last Played Map" placement="right">
                                <div className="ImageWrapper">
                                    <img src={map}></img>
                                </div>
                            </Tooltip>
                            </TableCell>
                            <TableCell>
                                {props.player ? props.player.lastmap : 0}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
        </div>
    </div>
  )
}
