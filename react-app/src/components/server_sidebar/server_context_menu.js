import React, { useEffect, useState } from 'react';
import '../css/contextmenu.css'
import ServerFormModal from './server_modal_del_edi_form'


const items = [
    { text: "Add Friend" },
    { text: "Edit Server Name" },
    { text: "Delete Server" }
]

const ContextMenu = ({ parentRef, serverId }) => {
    const [Visible, setVisible] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [Y, setY] = useState(0)
    const [X, setX] = useState(0)

    const closeMenu = (e) => {
        setVisible(false)
    }
    useEffect(() => {


        const parent = parentRef.current;
        if (!parent) {
            return;
        }

        const showMenu = (e) => {
            e.preventDefault();
            setVisible(true)
            setX(e.clientX)
            setY(e.clientY)
        };

        parent.addEventListener('contextmenu', showMenu);
        window.addEventListener('click', closeMenu);
        // window.addEventListener('contextmenu', closeMenu)

        return function cleanup() {
            parent.removeEventListener('contextmenu', showMenu);
            window.removeEventListener('click', closeMenu);
        }
    });

    const style = {
        top: Y,
        left: X,
    }

    const style1 = {
        visibility: "hidden"
    }

    // This part here is Jank in that the Modal will not show because it the component closes therefore on the
    // turnary i created the component but simply hid it away
    return Visible ?
        (
            <div id='context-menu-popup' style={style}>
                {items.map((item, index) => {
                    return (
                        <div key={index}>
                            <ServerFormModal item={item} serverId={serverId} setVisible={closeMenu} />
                        </div>
                    )
                })}
            </div>
        )
        :
        <div className='context-menu' style={style1}>
            {items.map((item, index) => {
                return (
                    <div key={index}>
                        <ServerFormModal item={item} serverId={serverId} />
                    </div>
                )
            })}
        </div>
}

export default ContextMenu
