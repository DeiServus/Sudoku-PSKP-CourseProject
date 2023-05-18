CREATE TABLE [dbo].[comment](
	[id] [int] NOT NULL PRIMARY KEY identity(1,1),
	[text] [nvarchar](50) NOT NULL,
	[mark] [float] NOT NULL,
	[user_id] [int] NOT NULL)

CREATE TABLE [dbo].[EmailVerificationLinks](
	[id] [int] NOT NULL PRIMARY KEY identity(1,1),
	[email] [nvarchar](250) NOT NULL unique,
	[userId] [int] NOT NULL unique)

CREATE TABLE [dbo].[game](
	[id] [int] NOT NULL PRIMARY KEY identity(1,1),
	[result] [bit] NOT NULL,
	[startDate] [datetime] NOT NULL,
	[endDate] [datetime] NOT NULL,
	[level_id] [int] NOT NULL,
	[user_id] [int] NOT NULL)

CREATE TABLE [dbo].[level](
	[id] [int] NOT NULL PRIMARY KEY identity(1,1),
	[title] [nchar](50) NOT NULL)

CREATE TABLE [dbo].[role](
	[id] [int] NOT NULL PRIMARY KEY identity(1,1),
	[title] [nvarchar](50) NOT NULL)

CREATE TABLE [dbo].[token](
	[id] [int] NOT NULL PRIMARY KEY identity(1,1),
	[userId] [int] NOT NULL unique,
	[refreshToken] [nvarchar](255) NOT NULL unique)

--CREATE TABLE [dbo].[user_login](
--	[id] [int] NOT NULL PRIMARY KEY identity(1,1),
--	[login] [nvarchar](50) NOT NULL,
--	[password] [nvarchar](50) NOT NULL)

CREATE TABLE [dbo].[user_profile](
	[id] [int] NOT NULL PRIMARY KEY identity(1,1),
	[login] [nvarchar](250) NOT NULL,
	[password] [nvarchar](250) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[rating] [int] NOT NULL,
	[role_id] [int] NOT NULL,
	[isActivated] bit default(0),
	activationLink [nvarchar](250))