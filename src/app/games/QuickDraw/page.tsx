'use client'

import Image from 'next/image';
import Link from 'next/link';
import mockGamePhoto from "@/assets/MOCK_GAME_1_HERO_IMAGE.jpg";

export default function QuickDrawInfo() {
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
                <h1 className="GameTitle text-6xl font-bold mb-2">QuickDraw!</h1>
                <h4 className="GameTags text-sm mb-8">RPG - Multiplayer - Simulation</h4>
                <p className="GameDescription text-md mb-8">
                    QuickDraw! is an engaging drawing and guessing game that brings out your creativity and intuition. <br />
                    Players take turns drawing a given word or phrase while others attempt to guess what it is. <br />
                    Points are awarded based on the accuracy of the guesses, with bonus points for quicker responses and longer play sessions. <br />
                    <br />
                    The game encourages imaginative illustrations and fosters a fun, fast-paced environment where players can showcase their artistic flair and deductive skills. <br/>
                    Ready to connect through sketches? Start drawing and guessing your way to victory in QuickDraw!
                </p>

                <div className="GamePageGameActions">
                    <Link href="/games/QuickDraw/play">
                        <button className="primary">Play Game</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};