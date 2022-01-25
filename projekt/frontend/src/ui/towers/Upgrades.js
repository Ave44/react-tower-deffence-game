import { useParams } from "react-router-dom"

const Upgrades = (props) => {
    const label = useParams().label
    const tower = props.towers[label]

    const displayUpgrades = () => {
        if(tower.upgrades) {
            return tower.upgrades.map(e=>{return <div key={e.label}>{e.label} {e.name} {e.cost}</div>})
        }
        return <div></div>
    }

    if(tower) {
        return <div className="content">
            <div className="header"><div className="title">{tower.name}</div></div>
            <div>{displayUpgrades()}</div>
        </div>
    }
    return <div>...</div>
}

export default Upgrades