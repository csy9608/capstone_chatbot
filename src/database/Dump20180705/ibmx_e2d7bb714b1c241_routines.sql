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
-- Temporary view structure for view `normal`
--

DROP TABLE IF EXISTS `normal`;
/*!50001 DROP VIEW IF EXISTS `normal`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `normal` AS SELECT 
 1 AS `id`,
 1 AS `type_id`,
 1 AS `menu`,
 1 AS `image`,
 1 AS `steps`,
 1 AS `time`,
 1 AS `calorie`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `delivery`
--

DROP TABLE IF EXISTS `delivery`;
/*!50001 DROP VIEW IF EXISTS `delivery`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `delivery` AS SELECT 
 1 AS `id`,
 1 AS `type_id`,
 1 AS `menu`,
 1 AS `image`,
 1 AS `steps`,
 1 AS `time`,
 1 AS `calorie`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `store24`
--

DROP TABLE IF EXISTS `store24`;
/*!50001 DROP VIEW IF EXISTS `store24`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `store24` AS SELECT 
 1 AS `id`,
 1 AS `type_id`,
 1 AS `menu`,
 1 AS `image`,
 1 AS `steps`,
 1 AS `time`,
 1 AS `calorie`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `normal`
--

/*!50001 DROP VIEW IF EXISTS `normal`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`bbcec353a2bef7`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `normal` AS select `recipe`.`id` AS `id`,`recipe`.`type_id` AS `type_id`,`recipe`.`menu` AS `menu`,`recipe`.`image` AS `image`,`recipe`.`steps` AS `steps`,`recipe`.`time` AS `time`,`recipe`.`calorie` AS `calorie` from `recipe` where (`recipe`.`type_id` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `delivery`
--

/*!50001 DROP VIEW IF EXISTS `delivery`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`bbcec353a2bef7`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `delivery` AS select `recipe`.`id` AS `id`,`recipe`.`type_id` AS `type_id`,`recipe`.`menu` AS `menu`,`recipe`.`image` AS `image`,`recipe`.`steps` AS `steps`,`recipe`.`time` AS `time`,`recipe`.`calorie` AS `calorie` from `recipe` where (`recipe`.`type_id` = 2) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `store24`
--

/*!50001 DROP VIEW IF EXISTS `store24`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`bbcec353a2bef7`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `store24` AS select `recipe`.`id` AS `id`,`recipe`.`type_id` AS `type_id`,`recipe`.`menu` AS `menu`,`recipe`.`image` AS `image`,`recipe`.`steps` AS `steps`,`recipe`.`time` AS `time`,`recipe`.`calorie` AS `calorie` from `recipe` where (`recipe`.`type_id` = 3) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-05  0:10:53
