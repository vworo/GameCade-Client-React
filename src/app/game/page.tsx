'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import mockGamePhoto from "@/assets/MOCK_GAME_1_HERO_IMAGE.jpg";

import './Game.css'

function Game() {
    return (
        <div className='GamePage flex flex-1 flex-col md:flex-row'>
            <div className="GamePageHeroImageContainer h-96 md:h-svh relative
                w-full
                md:w-2/5
            ">
                <Image 
                    src={mockGamePhoto}
                    fill={true}
                    alt="Picture of the author"
                />
            </div>

            <div className="GamePageDescriptionContainer border border-red pb-8 px-10
                w-full
                pt-10
                md:pt-8
                md:w-3/5
            ">
                <h1 className="GameTitle text-6xl font-bold mb-2">Retro Recess RPG</h1>
                <h4 className="GameTags text-sm mb-8">RPG - Multiplayer - Simulation</h4>
                <p className="GameDescription text-md mb-8">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    <br/>
                    <br/>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                    <br/>
                    <br/>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>

                <div className="GamePageGameActions">
                    <button className="primary">Play Game</button>
                </div>
            </div>
        </div>
    )
};

export default Game