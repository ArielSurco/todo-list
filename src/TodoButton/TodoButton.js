import './TodoButton.css';

const TodoButton = (props) => {
    const {action, children, onAction} = props;

    return (
        <button className={"todo-button todo-button--" + action} onClick={onAction}>
            {children}
        </button>
    );
}

export {TodoButton};