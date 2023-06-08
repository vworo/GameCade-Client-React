import Draw from '../components/drawtools/Draw.jsx';

export default function Canvas() {
    return (
        <div className="Canvas">
            <Draw 
                width={700}
                height={500}
            />
        </div>
    );
}