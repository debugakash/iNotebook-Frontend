import Notes from './Notes';

export const Home = (props) => {
    const { showAlert, changeColor } = props
    return (
        <div>
            <Notes showAlert={showAlert} changeColor={changeColor} />
        </div>
    )
}
