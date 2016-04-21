-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 21, 2016 at 11:40 PM
-- Server version: 5.7.12
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `hospitaldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `AppointmentID` int(11) NOT NULL,
  `PatientID` int(11) DEFAULT NULL,
  `HospitalID` int(11) DEFAULT NULL,
  `DoctorID` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`AppointmentID`, `PatientID`, `HospitalID`, `DoctorID`, `date`, `details`) VALUES
(1, 1, 1, 1, '2012-04-28 00:00:00', 'To die'),
(2, 2, 2, 2, '2014-04-28 00:00:00', 'remove eye'),
(3, 3, 1, 3, '2016-03-28 00:00:00', 'death'),
(4, 5, 2, 1, '2016-04-16 00:00:00', 'want to die'),
(5, 4, 1, 2, '2016-04-17 00:00:00', 'deading'),
(6, 1, 1, 1, '2016-04-19 00:00:00', 'amit deading'),
(7, 1, 1, 1, '2016-04-19 00:00:00', 'to live'),
(8, 1, 1, 1, '2016-04-19 00:00:00', 'to live again'),
(9, 1, 1, 1, '2016-04-21 00:00:00', 'to kill'),
(10, 1, 1, 1, '2016-04-19 07:00:00', 'dying with time'),
(11, 1, 1, 1, '2016-04-26 09:00:00', 'something');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `DoctorID` int(11) NOT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `HospitalID` int(11) DEFAULT NULL,
  `rating` int(3) DEFAULT NULL,
  `username` varchar(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`DoctorID`, `lastname`, `firstname`, `HospitalID`, `rating`, `username`, `password`) VALUES
(1, 'Maraj', 'Amit', 1, 99, 'doctorman', 'mandoctor'),
(2, 'Kalloo', 'Mitra', 2, 99, NULL, NULL),
(3, 'Maraj', 'Shelly', 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `HistoryID` int(11) NOT NULL,
  `PatientID` int(11) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`HistoryID`, `PatientID`, `details`) VALUES
(1, 1, 'To do something.'),
(2, 2, 'To remove eyes.'),
(3, 3, 'To remove brain.'),
(4, 3, 'To put back brain.');

-- --------------------------------------------------------

--
-- Table structure for table `hospitalinfo`
--

CREATE TABLE `hospitalinfo` (
  `HospitalID` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `resources` varchar(255) DEFAULT NULL,
  `rooms` int(11) DEFAULT NULL,
  `openingHour` int(2) DEFAULT NULL,
  `closingHour` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hospitalinfo`
--

INSERT INTO `hospitalinfo` (`HospitalID`, `name`, `location`, `resources`, `rooms`, `openingHour`, `closingHour`) VALUES
(1, 'Mt. Hope', 'Mt. Hope', 'death', 10, 8, 4),
(2, 'St Augustine Private Hospital', 'St .Augustine', 'more death', 15, 9, 5);

-- --------------------------------------------------------

--
-- Table structure for table `patientinfo`
--

CREATE TABLE `patientinfo` (
  `PatientID` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `sex` varchar(11) DEFAULT NULL,
  `username` varchar(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patientinfo`
--

INSERT INTO `patientinfo` (`PatientID`, `img`, `lastname`, `firstname`, `age`, `sex`, `username`, `password`) VALUES
(1, NULL, 'Doe', 'John', 666, 'Male', NULL, NULL),
(2, NULL, 'Manohar', 'Akash', 21, 'Male', NULL, NULL),
(3, NULL, 'Gajai', 'Shiva-Dev', 22, 'Male', NULL, NULL),
(4, NULL, 'Lastname', 'Firstname', 50, 'Female', NULL, NULL),
(12, NULL, 'last', 'first', 12, 'man', 'moreman', 'manmore'),
(13, 'Sunset-in-Egypt.jpg', 'kalloo', 'mitra', 23, 'm', 'jidgfjksdk', '3213'),
(14, 'SketchFlowMap.png', 'Gajai', 'Shiva-Dev', 22, 'M', 'gajai', 'pokemon'),
(15, 'SketchFlowMap.png', '4', '4', 4, 'm', '4', '4'),
(16, 'SketchFlowMap.png', 'r', 'r', 4, 'm', 'r', 'r'),
(17, 'SketchFlowMap.png', 'a', 'a', 1, 'm', 'a', 'a'),
(18, '1 (2).png', 'sdfsdf', 'sdfsdf', 23, 'male', 'sdfsdf', 'asdwera'),
(19, 'c78c792553e19cd566d83601f9e3a8fe-football.png', 'kalloo', 'mitra', 23, 'm', 'mk', '1234'),
(20, '2.png', 'maraj', 'amit', 12, 'male', 'wingman', 'w5345b3647h4');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `RoomID` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HospitalID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`RoomID`, `name`, `details`, `HospitalID`) VALUES
(1, 'room1', 'the first god', 1),
(2, 'room 2', 'the 2nd god', 1);

-- --------------------------------------------------------

--
-- Table structure for table `surgery`
--

CREATE TABLE `surgery` (
  `SurgeryID` int(11) NOT NULL,
  `details` varchar(255) DEFAULT NULL,
  `PatientID` int(11) DEFAULT NULL,
  `DoctorID` int(11) DEFAULT NULL,
  `RoomID` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `priority` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surgery`
--

INSERT INTO `surgery` (`SurgeryID`, `details`, `PatientID`, `DoctorID`, `RoomID`, `date`, `duration`, `priority`) VALUES
(1, 'first', 1, 1, 1, NULL, NULL, NULL),
(2, 'second', 2, 2, 2, NULL, NULL, NULL),
(3, '3rd', 1, 1, 1, NULL, '02:00:00', 2),
(4, NULL, 1, 1, 1, NULL, NULL, 1),
(5, NULL, 2, 3, 1, NULL, NULL, 5),
(6, NULL, 1, 1, 2, NULL, NULL, 5),
(7, '7', 1, 1, 1, '2016-04-18 07:00:00', '04:00:00', 2),
(8, '8', 1, 1, 1, '2016-04-19 07:00:00', '05:00:00', 2),
(9, '9', 2, 2, 1, '2016-04-19 12:00:00', '03:00:00', 4),
(10, '10', 1, 1, 2, '2016-04-19 07:00:00', '04:00:00', 2),
(11, '11', 1, 1, 1, '2016-04-20 10:00:00', '08:00:00', 2),
(12, '12', 2, 2, 2, '2016-04-21 12:00:00', '02:00:00', 1),
(20, '2', 2, 2, 2, '2016-04-20 08:00:00', '02:00:00', 2),
(21, '2', 2, 2, 2, '2016-04-20 08:00:00', '02:00:00', 2),
(22, '1', 1, 1, 1, '2016-04-22 08:00:00', '01:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE `temp` (
  `TempID` int(11) NOT NULL,
  `details` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PatientID` int(11) DEFAULT NULL,
  `DoctorID` int(11) DEFAULT NULL,
  `duration` int(3) DEFAULT NULL,
  `priority` int(2) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`AppointmentID`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`DoctorID`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`HistoryID`);

--
-- Indexes for table `hospitalinfo`
--
ALTER TABLE `hospitalinfo`
  ADD PRIMARY KEY (`HospitalID`);

--
-- Indexes for table `patientinfo`
--
ALTER TABLE `patientinfo`
  ADD PRIMARY KEY (`PatientID`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`RoomID`);

--
-- Indexes for table `surgery`
--
ALTER TABLE `surgery`
  ADD PRIMARY KEY (`SurgeryID`);

--
-- Indexes for table `temp`
--
ALTER TABLE `temp`
  ADD PRIMARY KEY (`TempID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `AppointmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `DoctorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `HistoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `hospitalinfo`
--
ALTER TABLE `hospitalinfo`
  MODIFY `HospitalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `patientinfo`
--
ALTER TABLE `patientinfo`
  MODIFY `PatientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `RoomID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `surgery`
--
ALTER TABLE `surgery`
  MODIFY `SurgeryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `temp`
--
ALTER TABLE `temp`
  MODIFY `TempID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
