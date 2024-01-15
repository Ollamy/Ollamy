import { Heading, Image, Text, VStack } from 'native-base';

interface SectionHeaderProps {
	icon: string;
	title: string;
	description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, description }) => {
	return (
		<VStack
			p={12}
			mt={12}
			w="full"
			position="relative"
			bg="#ECE6FC"
			borderColor="#876BF6"
			borderWidth={1}
			borderRadius="12px"
			alignItems="center"
			space="12px"
		>
			<Image source={{ uri: icon }} alt="icon" width="100px" height="100px" marginTop={-24} />
			<Heading textAlign="center" size="lg" color="#876BF6">
				{title}
			</Heading>
			<Text textAlign="center">{description}</Text>
		</VStack>
	);
};

export default SectionHeader;
