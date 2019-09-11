-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: us-cdbr-sl-dfw-01.cleardb.net    Database: ibmx_e2d7bb714b1c241
-- ------------------------------------------------------
-- Server version	5.6.40-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(30) NOT NULL,
  `allergy` varchar(30) DEFAULT NULL,
  `priority` varchar(2) DEFAULT NULL,
  `likes` varchar(30) DEFAULT NULL,
  `hates` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('aaa1',NULL,NULL,NULL,NULL),('chy','null','CA','버섯','가지'),('chyy',NULL,NULL,NULL,NULL),('csy','null','TA','딸기','가지'),('cyy',NULL,NULL,NULL,NULL),('dbs5566',NULL,NULL,NULL,NULL),('ekimja9636','null','CA','김치','null'),('Hyen',NULL,NULL,NULL,NULL),('mjhwang96','호두','nu','아몬드','마늘'),('PIC ME','null','nu','null','null'),('PIC_ME',NULL,NULL,NULL,NULL),('sty',NULL,NULL,NULL,NULL),('ui123','null','nu','null','null'),('yyy',NULL,NULL,NULL,NULL),('zsdg',NULL,NULL,NULL,NULL),('ㄴㄷ','null','nu','null','null'),('ㅎㅎ','null','nu','양파','오이'),('감자국킬러','null','TA','고기','null'),('겸댕이','null','CA',NULL,'null'),('겸댕이친구',NULL,NULL,NULL,NULL),('나가기',NULL,NULL,NULL,NULL),('네','null','nu','새우','null'),('민주','호두','nu','null','null'),('장성은',NULL,NULL,NULL,NULL),('재원',NULL,NULL,NULL,NULL),('캡디',NULL,NULL,NULL,NULL),('태경짱짱',NULL,NULL,NULL,NULL),('픽미','null','CA',NULL,'null'),('하이루',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-05  0:10:26
