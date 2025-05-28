export interface IDiscordChannel {
	id: string;
	name: string;
	position: number;
}

export interface IMember {
	id: string;
	username: string;
	discriminator: string;
	avatar: null;
	status: string;
	avatarUrl: string;
	game?: {
		name: string;
	}
	deaf?: boolean;
	mute?: boolean;
	self_deaf?: boolean;
	self_mute?: boolean;
	suppress?: boolean;
	channel_id?: string;
}

export interface IDiscordServer {
	id: string;
	name: string;
	instant_invite: string;
	channels: IDiscordChannel[];
	members: IMember[];
	presence_count: number;
}

