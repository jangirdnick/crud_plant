import { SignIn } from '@stackframe/stack';
import PlantCard from './PlantCard';
import { stackServerApp } from '@/stack';
import { getPlantById } from '@/actions/plant.action';

interface PlantPageProps {
    params: { slug: string };
}



export async function generateMetadata({params}: {params: {slug: string}}) {

    const [id] = params.slug.split('--');
    const plant = await getPlantById(id)

    if(!plant) {
        return {
            title: 'Plant Details Not Found',
            description: 'The requested plant could not be found.',
        }
    }

    return {
        title: plant.name,
        description: plant.description,
    }

}



const PlantPage: React.FC<PlantPageProps> = async (props: { params: { slug: string } }) => {
    const { params } = await Promise.resolve(props); // Ensure params is awaited if it's a Promise

    const user = await stackServerApp.getUser();
    const [id] = params.slug.split("--");
    const plant = await getPlantById(id);

    if (!user) return <SignIn />;

    return (
        <div className='mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6'>
            <div className='lg:col-span-full'>
                <PlantCard plant={plant} />
            </div>
        </div>
    );
};

export default PlantPage