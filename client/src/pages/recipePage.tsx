


export default function RecipePage() {

    return (
        <>
            <h1> Recipe Title </h1>
            <h2>created by: </h2>
            <h4>categories</h4>

           <div style={{
            display: 'flex',
            justifyContent: 'center',

           }}>
                <ul style={{
                    margin: '20px'
                }}>
                    <label>instructions</label>
                    <li>item example one</li>
                    <li>item example two</li>
                </ul>

                <ul>
                    <label>ingredients</label>
                    <li>item example one</li>
                    <li>item example two</li>
                </ul>
           </div>
           

            
        </>
    )
        
}