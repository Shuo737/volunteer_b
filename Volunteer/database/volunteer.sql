-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2017 at 12:30 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `volunteer`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `evename` varchar(50) NOT NULL,
  `evstime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `evetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `evedesc` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`evename`, `evstime`, `evetime`, `evedesc`) VALUES
('CIBC Run For The Cure', '2016-10-02 16:00:00', '2016-10-02 18:00:00', 'On October 2nd at the Canadian Breast Cancer Foundation CIBC Run for the Cure, nearly one hundred thousand people came together in communities across Canada in support of our shared vision of a future without breast cancer.');

-- --------------------------------------------------------

--
-- Table structure for table `events_locations`
--

CREATE TABLE `events_locations` (
  `evename` varchar(50) NOT NULL,
  `evstime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `spsname` varchar(50) NOT NULL,
  `locaddr` varchar(50) NOT NULL,
  `loccity` varchar(50) NOT NULL,
  `eletime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `spsname` varchar(50) NOT NULL,
  `locaddr` varchar(50) NOT NULL,
  `loccity` varchar(50) NOT NULL,
  `locprov` varchar(50) NOT NULL,
  `locnation` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `management`
--

CREATE TABLE `management` (
  `mbid` decimal(5,0) NOT NULL,
  `mbacronym` varchar(5) NOT NULL,
  `mtpassword` varchar(16) NOT NULL,
  `mtposition` varchar(50) NOT NULL,
  `mbphoto` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `mbid` decimal(5,0) NOT NULL,
  `mbacronym` varchar(5) NOT NULL,
  `mbname` varchar(50) NOT NULL,
  `mbphone` decimal(10,0) DEFAULT NULL,
  `mbemail` varchar(50) DEFAULT NULL,
  `mbmdesc` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`mbid`, `mbacronym`, `mbname`, `mbphone`, `mbemail`, `mbmdesc`) VALUES
('1', 'LYW', 'Charles Li', '3062026614', 'Charles.li.math@gmail.com', NULL),
('2', 'QZH', 'Zihen Qu', '3068813496', NULL, NULL),
('3', 'YS', 'Shuo Yuan', '3062215326', 'foster336699@gmail.com', 'Shuo is a current Computer Science student of University of Saskatchewan, Founder and Tech Lead of Cornerstone Volunteer Group. Love music, basketball, coding, more importantly, World of Warcraft. He '),
('4', 'LFF', 'FanFei Lu', NULL, 'lufanfei1966@126.com', NULL),
('5', 'WZF', 'Ziffan Wang', '3068816625', NULL, NULL),
('6', 'BLY', 'Luoyu Bian', NULL, 'alexbian0208@gmail.com', NULL),
('7', 'YYK', 'Kunyu Yang', NULL, 'caffery32@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `members_events`
--

CREATE TABLE `members_events` (
  `mbid` decimal(5,0) NOT NULL,
  `mbacronym` varchar(5) NOT NULL,
  `evename` varchar(50) NOT NULL,
  `evstime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `meetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `members_locations`
--

CREATE TABLE `members_locations` (
  `mbid` decimal(5,0) NOT NULL,
  `mbacronym` varchar(5) NOT NULL,
  `spsname` varchar(50) NOT NULL,
  `locaddr` varchar(50) NOT NULL,
  `loccity` varchar(50) NOT NULL,
  `mlstime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mletime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sponsors`
--

CREATE TABLE `sponsors` (
  `spsname` varchar(50) NOT NULL,
  `spsdesc` varchar(50) NOT NULL,
  `spphone` decimal(10,0) DEFAULT NULL,
  `spemail` varchar(50) DEFAULT NULL,
  `spfax` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`evename`,`evstime`);

--
-- Indexes for table `events_locations`
--
ALTER TABLE `events_locations`
  ADD PRIMARY KEY (`evename`,`evstime`,`spsname`,`locaddr`,`loccity`),
  ADD KEY `spsname` (`spsname`,`locaddr`,`loccity`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`spsname`,`locaddr`,`loccity`);

--
-- Indexes for table `management`
--
ALTER TABLE `management`
  ADD PRIMARY KEY (`mbid`,`mbacronym`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`mbid`,`mbacronym`);

--
-- Indexes for table `members_events`
--
ALTER TABLE `members_events`
  ADD PRIMARY KEY (`mbid`,`mbacronym`,`evename`,`evstime`),
  ADD KEY `evename` (`evename`,`evstime`);

--
-- Indexes for table `members_locations`
--
ALTER TABLE `members_locations`
  ADD PRIMARY KEY (`mbid`,`mbacronym`,`spsname`,`locaddr`,`loccity`,`mlstime`),
  ADD KEY `spsname` (`spsname`,`locaddr`,`loccity`);

--
-- Indexes for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD PRIMARY KEY (`spsname`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events_locations`
--
ALTER TABLE `events_locations`
  ADD CONSTRAINT `events_locations_ibfk_1` FOREIGN KEY (`evename`,`evstime`) REFERENCES `events` (`evename`, `evstime`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `events_locations_ibfk_2` FOREIGN KEY (`spsname`,`locaddr`,`loccity`) REFERENCES `locations` (`spsname`, `locaddr`, `loccity`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`spsname`) REFERENCES `sponsors` (`spsname`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `management`
--
ALTER TABLE `management`
  ADD CONSTRAINT `fk_mamb` FOREIGN KEY (`mbid`,`mbacronym`) REFERENCES `members` (`mbid`, `mbacronym`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `members_events`
--
ALTER TABLE `members_events`
  ADD CONSTRAINT `members_events_ibfk_1` FOREIGN KEY (`mbid`,`mbacronym`) REFERENCES `members` (`mbid`, `mbacronym`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `members_events_ibfk_2` FOREIGN KEY (`evename`,`evstime`) REFERENCES `events` (`evename`, `evstime`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `members_locations`
--
ALTER TABLE `members_locations`
  ADD CONSTRAINT `members_locations_ibfk_1` FOREIGN KEY (`mbid`,`mbacronym`) REFERENCES `members` (`mbid`, `mbacronym`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `members_locations_ibfk_2` FOREIGN KEY (`spsname`,`locaddr`,`loccity`) REFERENCES `locations` (`spsname`, `locaddr`, `loccity`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
