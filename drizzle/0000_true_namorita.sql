CREATE TABLE `category_table` (
	`_id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`color` text NOT NULL,
	`icon` text NOT NULL,
	`description` text DEFAULT '',
	`isFavorite` integer DEFAULT false,
	`createdAt` integer DEFAULT (CURRENT_DATE),
	`updatedAt` integer DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE `group_table` (
	`_id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`color` text NOT NULL,
	`icon` text NOT NULL,
	`description` text DEFAULT '',
	`isFavorite` integer DEFAULT false,
	`createdAt` integer DEFAULT (CURRENT_DATE),
	`updatedAt` integer DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE `transaction_table` (
	`_id` text PRIMARY KEY NOT NULL,
	`note` text DEFAULT '',
	`date` integer NOT NULL,
	`amount` real NOT NULL,
	`currency` text NOT NULL,
	`category` text NOT NULL,
	`conversionRate` real DEFAULT 1,
	`group` text,
	`image` text DEFAULT 'null',
	`createdAt` integer DEFAULT (CURRENT_DATE),
	`updatedAt` integer DEFAULT (CURRENT_DATE)
);


INSERT INTO group_table (_id, title, color, icon)
VALUES 
	('default_group_1', 'Paris', '#FFB6C1', 'icon_94'),
	('default_group_2', 'Thailand', '#64B5F6', 'icon_23'),
    ('default_group_3', 'Utilities', '#FFCC80', 'icon_93');

INSERT INTO category_table (_id, title, type, color, icon)
VALUES
    ('default_category_1', 'Travel', 'expense', '#66994D', 'travel'),
    ('default_category_2', 'Salary', 'income', '#ffb507', 'salary'),
    ('default_category_3', 'Food', 'expense', '#182276', 'food'),
    ('default_category_4', 'Shopping', 'expense', '#00BCD4', 'shopping');