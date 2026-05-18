import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="pt-24 mx-8 md:mx-12 min-h-screen flex flex-col">
            <h1 className="text-4xl my-4">Bem-vindo, Administrador!</h1>

            <Link
                to="/jogadores"
                className="bg-indigo-500 text-white px-4 py-2 rounded w-fit mt-4"
            >
                Ver jogadores
            </Link>
        </section>
    );
};

export default Home;