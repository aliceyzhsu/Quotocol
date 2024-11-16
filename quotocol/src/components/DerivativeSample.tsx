import React from "react";
import HoverBox from "./ui/hoverbox";

interface ShortDerivativeData {
	AuthorENS: string;
	Content: string;
}

interface Source {
	URL: string;
	nftID: string;
	AuthorENS: string;
	AuthorAddr: string;
	Date: string;
	replica: string;
}

interface Quotation {
	quoterENS: string;
	quoterAddr: string;
	Date: string;
	Content: string;
}

interface DerivativeData {
	source: Source;
	quotation: Quotation;
}

const shortDerivateData: ShortDerivativeData[] = [
	{
		"AuthorENS": "vitalik.eth",
		"Content": "this is a varified quotation"
	},
	{
		"AuthorENS": "vitalik.eth",
		"Content": "this is a varified quotation"
	},
	{
		"AuthorENS": "vitalik.eth",
		"Content": "this is a varified quotation"
	},
	{
		"AuthorENS": "vitalik.eth",
		"Content": "this is a varified quotation"
	}
];

const derivateData: DerivativeData[] = [
	{
		"source": {
			"URL": "https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274",
			"nftID": "0",
			"AuthorENS": "vitalik.eth",
			"AuthorAddr": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
			"Date": "2018-07-24T23:25:35.313Z",
			"replica": "ipfs://QmWFAZZY9VtY4fpHaGZMgwXecxxZ7VDkuSVUPyuouZztCK"
		},
		"quotation": {
			"quoterENS": "None",
			"quoterAddr": "0x948aCeE55C6bb41D1Bd07AFc85651f99e67c4905",
			"Date": "2024-11-16",
			"Content": "this is a varified quotation"
		}
	},
	{
		"source": {
			"URL": "https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274",
			"nftID": "0",
			"AuthorENS": "vitalik.eth",
			"AuthorAddr": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
			"Date": "2018-07-24T23:25:35.313Z",
			"replica": "ipfs://QmWFAZZY9VtY4fpHaGZMgwXecxxZ7VDkuSVUPyuouZztCK"
		},
		"quotation": {
			"quoterENS": "None",
			"quoterAddr": "0x948aCeE55C6bb41D1Bd07AFc85651f99e67c4905",
			"Date": "2024-11-16",
			"Content": "this is a varified quotation"
		}
	},
	{
		"source": {
			"URL": "https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274",
			"nftID": "0",
			"AuthorENS": "vitalik.eth",
			"AuthorAddr": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
			"Date": "2018-07-24T23:25:35.313Z",
			"replica": "ipfs://QmWFAZZY9VtY4fpHaGZMgwXecxxZ7VDkuSVUPyuouZztCK"
		},
		"quotation": {
			"quoterENS": "None",
			"quoterAddr": "0x948aCeE55C6bb41D1Bd07AFc85651f99e67c4905",
			"Date": "2024-11-16",
			"Content": "this is a varified quotation"
		}
	},
	{
		"source": {
			"URL": "https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274",
			"nftID": "0",
			"AuthorENS": "vitalik.eth",
			"AuthorAddr": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
			"Date": "2018-07-24T23:25:35.313Z",
			"replica": "ipfs://QmWFAZZY9VtY4fpHaGZMgwXecxxZ7VDkuSVUPyuouZztCK"
		},
		"quotation": {
			"quoterENS": "None",
			"quoterAddr": "0x948aCeE55C6bb41D1Bd07AFc85651f99e67c4905",
			"Date": "2024-11-16",
			"Content": "this is a varified quotation"
		}
	}
];

const ShowShortDerivativeData: React.FC<{ data: ShortDerivativeData }> = ({ data }) => (
	<div className="flex flex-col gap-2 min-w-[300px]">
		<div className="flex items-center gap-2">
			<span className="text-sm font-semibold text-purple-600">Quotation</span>
			<span className="text-gray-500">•</span>
			<span className="text-sm text-blue-500">{data.AuthorENS}</span>
		</div>
		<p className="text-lg font-medium text-gray-800">
			"{data.Content}"
		</p>
	</div>
);

const ShowDerivativeData: React.FC<{ data: DerivativeData }> = ({ data }) => (
	<div className="flex flex-col gap-3 p-2 min-w-[400px]">
		<div className="flex items-center gap-2 mb-2">
			<span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
				SourceNFT #{data.source.nftID}
			</span>
		</div>
		
		<div className="space-y-4 text-sm">
			{/* Source Information */}
			<div className="border-l-2 border-purple-200 pl-3">
				<h4 className="text-purple-600 font-medium mb-2">Source</h4>
				<div className="space-y-2">
					<div className="flex flex-col gap-1">
						<span className="text-gray-500">Author</span>
						<div className="flex items-center gap-2">
							<span className="text-blue-500">{data.source.AuthorENS}</span>
							<span className="text-gray-400">|</span>
							<span className="text-xs font-mono text-gray-600">{data.source.AuthorAddr}</span>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-gray-500">Publication Date</span>
						<span>{new Date(data.source.Date).toLocaleDateString()}</span>
					</div>
				</div>
			</div>

			{/* Quotation Information */}
			<div className="border-l-2 border-blue-200 pl-3">
				<h4 className="text-blue-600 font-medium mb-2">Quotation</h4>
				<div className="space-y-2">
					<div className="flex flex-col gap-1">
						<span className="text-gray-500">Quoter</span>
						<div className="flex items-center gap-2">
							{data.quotation.quoterENS !== "None" && (
								<>
									<span className="text-blue-500">{data.quotation.quoterENS}</span>
									<span className="text-gray-400">|</span>
								</>
							)}
							<span className="text-xs font-mono text-gray-600">{data.quotation.quoterAddr}</span>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-gray-500">Date</span>
						<span>{data.quotation.Date}</span>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-gray-500">Content</span>
						<p className="text-gray-800 italic">"{data.quotation.Content}"</p>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const DerivativeSample: React.FC = () => {
	return (
		<div className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-4">
			{derivateData.map((data, idx) => (
				<HoverBox
					key={idx}
					shortData={<ShowShortDerivativeData data={shortDerivateData[idx]} />}
					fullData={<ShowDerivativeData data={data} />}
					link={data.source.URL}
				/>
			))}
		</div>
	);
};

export default DerivativeSample;