import logoImg from "../../assets/logo.svg";
import "./styles.scss";

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
    return (
        <section className="header__container">
            <div className="header__content">
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </div>
        </section>
    );
}
