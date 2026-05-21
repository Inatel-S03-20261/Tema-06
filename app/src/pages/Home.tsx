import ActionLink from "../components/ActionLink";
import PageLayout from "../components/PageLayout";

const Home = () => {
    return (
        <PageLayout title="Bem vindo ao painel de administração" className="text-center">
            <div className="grid gap-4 md:grid-cols-2">
                <ActionLink
                    to="/jogadores"
                    className="w-full h-32 p-6 text-xl font-semibold flex items-center justify-center"
                >
                    Dashboard de Jogadores
                </ActionLink>
                <ActionLink
                    to="/trocas"
                    className="w-full h-32 p-6 text-xl font-semibold flex items-center justify-center"
                >
                    Dashboard de Trocas
                </ActionLink>
            </div>
        </PageLayout>
    );
};

export default Home;