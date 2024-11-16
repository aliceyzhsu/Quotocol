import React from "react";
import HoverBox from "./ui/hoverbox";

interface ShortSourceData {
	platform: string;
	authorID: string;
	title: string;
}

interface SourceData extends ShortSourceData {
	sourceURL: string;
	authorENS: string;
	authorAddr: string;
	lastModifiedDate: string;
	contentReplica: string;
}

const shortSourceData: ShortSourceData[] = [
	{
		"platform": "Medium",
		"authorID": "@VitalikButerin",
		"title": "The Meaning of Decentralization"
	},
	{
		"platform": "Medium",
		"authorID": "@VitalikButerin",
		"title": "The Meaning of Decentralization"
	},
	{
		"platform": "Medium",
		"authorID": "@VitalikButerin",
		"title": "The Meaning of Decentralization"
	},
	{
		"platform": "Medium",
		"authorID": "@VitalikButerin",
		"title": "The Meaning of Decentralization"
	}
];

const sourceData: SourceData[] = [
	{
		"sourceURL": "https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274",
		"platform": "Medium",
		"authorID": "@VitalikButerin",
		"authorENS": "vitalik.eth",
		"authorAddr": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		"lastModifiedDate": "2018-07-24T23:25:35.313Z",
		"contentReplica": "ipfs://QmWFAZZY9VtY4fpHaGZMgwXecxxZ7VDkuSVUPyuouZztCK",
		"title": "The Meaning of Decentralization"
	},
	{
		"sourceURL": "https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274",
		"platform": "Medium",
		"authorID": "@VitalikButerin",
		"authorENS": "vitalik.eth",
		"authorAddr": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		"lastModifiedDate": "2018-07-24T23:25:35.313Z",
		"contentReplica": "ipfs://QmWFAZZY9VtY4fpHaGZMgwXecxxZ7VDkuSVUPyuouZztCK",
		"title": "The Meaning of Decentralization"
	},
	{
		"sourceURL": "https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274",
		"platform": "Medium",
		"authorID": "@VitalikButerin",
		"authorENS": "vitalik.eth",
		"authorAddr": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		"lastModifiedDate": "2018-07-24T23:25:35.313Z",
		"contentReplica": "ipfs://QmWFAZZY9VtY4fpHaGZMgwXecxxZ7VDkuSVUPyuouZztCK",
		"title": "The Meaning of Decentralization"
	},
	{
		"sourceURL": "https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274",
		"platform": "Medium",
		"authorID": "@VitalikButerin",
		"authorENS": "vitalik.eth",
		"authorAddr": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		"lastModifiedDate": "2018-07-24T23:25:35.313Z",
		"contentReplica": "ipfs://QmWFAZZY9VtY4fpHaGZMgwXecxxZ7VDkuSVUPyuouZztCK",
		"title": "The Meaning of Decentralization"
	}
];

const ShowShortSourceData: React.FC<{ data: ShortSourceData }> = ({ data }) => (
	<div className="flex flex-col gap-2 min-w-[300px]">
		<div className="flex items-center gap-2">
			<span className="text-sm font-semibold text-purple-600">{data.platform}</span>
			<span className="text-gray-500">•</span>
			<span className="text-sm text-gray-600">{data.authorID}</span>
		</div>
		<h3 className="text-lg font-medium text-gray-800">{data.title}</h3>
	</div>
);

const ShowSourceData: React.FC<{ data: SourceData }> = ({ data }) => (
	<div className="flex flex-col gap-3 p-2 min-w-[400px]">
		<div className="flex items-center gap-2 mb-2">
			<span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
				{data.platform}
			</span>
			<h3 className="text-xl font-semibold text-gray-800">{data.title}</h3>
		</div>

		<div className="space-y-2 text-sm">
			<div className="flex flex-col gap-1">
				<span className="text-gray-500">Author</span>
				<div className="flex items-center gap-2">
					<span className="font-medium">{data.authorID}</span>
					<span className="text-gray-400">|</span>
					<span className="text-blue-500">{data.authorENS}</span>
				</div>
				<span className="text-gray-600 text-xs font-mono">{data.authorAddr}</span>
			</div>

			<div className="flex flex-col gap-1">
				<span className="text-gray-500">Last Modified</span>
				<span>{new Date(data.lastModifiedDate).toLocaleDateString()}</span>
			</div>

			<div className="flex flex-col gap-1">
				<span className="text-gray-500">Content IPFS</span>
				<span className="text-xs font-mono text-gray-600 break-all">
					{data.contentReplica}
				</span>
			</div>
		</div>
	</div>
);

const SourceSample: React.FC = () => {
	return (
		<div className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-4">
			{sourceData.map((data, idx) => (
				<HoverBox
					key={idx}
					shortData={<ShowShortSourceData data={shortSourceData[idx]} />}
					fullData={<ShowSourceData data={data} />}
					link={data.sourceURL}
				/>
			))}
		</div>
	);
};

export default SourceSample;