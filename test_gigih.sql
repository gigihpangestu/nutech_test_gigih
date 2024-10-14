-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2024 at 06:12 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_gigih`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_balances`
--

CREATE TABLE `tb_balances` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `balance` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_balances`
--

INSERT INTO `tb_balances` (`id`, `email`, `balance`) VALUES
(1, 'üser@nutech-integrasi.com', '500000.00');

-- --------------------------------------------------------

--
-- Table structure for table `tb_services`
--

CREATE TABLE `tb_services` (
  `id` int(11) NOT NULL,
  `service_code` varchar(50) NOT NULL,
  `service_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_services`
--

INSERT INTO `tb_services` (`id`, `service_code`, `service_name`) VALUES
(1, 'PLN_PRABAYAR', 'PLN PRABAYAR');

-- --------------------------------------------------------

--
-- Table structure for table `tb_topup`
--

CREATE TABLE `tb_topup` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `transaction_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_topup`
--

INSERT INTO `tb_topup` (`id`, `email`, `amount`, `transaction_type`) VALUES
(1, 'üser@nutech-integrasi.com', '100000.00', 'topup'),
(2, 'üser@nutech-integrasi.com', '100000.00', 'topup'),
(3, 'üser@nutech-integrasi.com', '100000.00', 'topup'),
(4, 'üser@nutech-integrasi.com', '100000.00', 'topup');

-- --------------------------------------------------------

--
-- Table structure for table `tb_transaction`
--

CREATE TABLE `tb_transaction` (
  `id` int(11) NOT NULL,
  `invoice_number` varchar(50) NOT NULL,
  `service_code` varchar(50) NOT NULL,
  `service_name` varchar(50) NOT NULL,
  `transaction_type` varchar(50) NOT NULL,
  `total_amount` decimal(15,2) NOT NULL,
  `creatend_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_transaction`
--

INSERT INTO `tb_transaction` (`id`, `invoice_number`, `service_code`, `service_name`, `transaction_type`, `total_amount`, `creatend_on`, `email`) VALUES
(0, '4dff2670-3e40-4197-a6b1-0cc272f5edca', 'PLN_PRABAYAR', 'PLN PRABAYAR', 'PAYMENT', '10000.00', '2024-10-14 15:35:05', '');

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(1, 'üser@nutech-integrasi.com', 'abcdef1234', 'User', 'Nutech');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_balances`
--
ALTER TABLE `tb_balances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK__tb_users` (`email`);

--
-- Indexes for table `tb_services`
--
ALTER TABLE `tb_services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `service_code` (`service_code`);

--
-- Indexes for table `tb_topup`
--
ALTER TABLE `tb_topup`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK__tb_balances` (`email`);

--
-- Indexes for table `tb_transaction`
--
ALTER TABLE `tb_transaction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoice_number` (`invoice_number`),
  ADD KEY `FK_tb_transaction_tb_services` (`service_code`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_balances`
--
ALTER TABLE `tb_balances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_services`
--
ALTER TABLE `tb_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_topup`
--
ALTER TABLE `tb_topup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_balances`
--
ALTER TABLE `tb_balances`
  ADD CONSTRAINT `FK__tb_users` FOREIGN KEY (`email`) REFERENCES `tb_users` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_topup`
--
ALTER TABLE `tb_topup`
  ADD CONSTRAINT `FK__tb_balances` FOREIGN KEY (`email`) REFERENCES `tb_balances` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_transaction`
--
ALTER TABLE `tb_transaction`
  ADD CONSTRAINT `FK_tb_transaction_tb_services` FOREIGN KEY (`service_code`) REFERENCES `tb_services` (`service_code`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
