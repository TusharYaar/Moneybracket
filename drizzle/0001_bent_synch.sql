PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_transaction_table` (
	`_id` text PRIMARY KEY NOT NULL,
	`note` text DEFAULT '',
	`date` integer NOT NULL,
	`amount` real NOT NULL,
	`currency` text NOT NULL,
	`category` text NOT NULL,
	`conversionRate` real DEFAULT 1,
	`conversionCurrency` text DEFAULT '',
	`group` text,
	`image` text,
	`createdAt` integer DEFAULT (CURRENT_DATE),
	`updatedAt` integer DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
INSERT INTO `__new_transaction_table`("_id", "note", "date", "amount", "currency", "category", "conversionRate", "conversionCurrency", "group", "image", "createdAt", "updatedAt") SELECT "_id", "note", "date", "amount", "currency", "category", "conversionRate", "group", "image", "createdAt", "updatedAt" FROM `transaction_table`;--> statement-breakpoint
DROP TABLE `transaction_table`;--> statement-breakpoint
ALTER TABLE `__new_transaction_table` RENAME TO `transaction_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
