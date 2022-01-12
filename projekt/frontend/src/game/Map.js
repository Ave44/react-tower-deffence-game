const Map = () => {
    const size = {x: 8, y: 8}

    const tile = (x, y) => {
        return <div className="tile">{x}{y}</div>
    }

    const row = (x, y) => {
        const arry = []
        for (var i = 1; i <= x; i++) {
            arry.push(i);
        }

        const row = arry.map(x=><div key={x}>{tile(x,y)}</div>)
        return row
    }

    const rows = (x, y) => {
        const arry = []
        for (var i = 1; i <= y; i++) {
            arry.push(i);
        }

        const rows = arry.map(y=><div key={y} className="row">{row(x,y)}</div>)
        return rows
    }
    return (<div>
        <div>map</div>
        <div className="map">{rows(size.x, size.y)}</div>
    </div>)
}

export default Map