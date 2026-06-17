import { useState } from "react";

const FAQ = [
  { id: 1, q: 'Що таке React?', a: 'Бібліотека для UI' },
  { id: 2, q: 'Що таке хук?', a: 'Функція з use...' },
  { id: 3, q: 'Що таке JSX?', a: 'Синтаксичний цукор' },
]

const Articles = () => {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId(id === openId ? null : id);
    }

    return (
        <div>
            {FAQ.map(item => (
                <div key={item.id}>
                    <h3 onClick={() => toggle(item.id)}>{item.q}</h3>
                    {openId === item.id && <p>{item.a}</p>}
                </div>

            ))}

        </div>
    );
}

export default Articles;

