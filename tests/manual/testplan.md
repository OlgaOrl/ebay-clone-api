# eBayClone API Testplaan

## 1. Pealkiri, versioon, autorid

**Dokumendi pealkiri:** eBayClone API Testimise Plaan  
**Versioon:** 1.0  
**Autor:** [Olga Orlova]  
**Kuupäev:** 28. mai 2025  
**Projekt:** eBayClone API

## 2. Dokumendi ajalugu ja heakskiidud

| Versioon | Kuupäev | Autor | Muudatuste kirjeldus | Heakskiit |
|----------|---------|-------|---------------------|-----------|
| 1.0 | 28.05.2025 | [Teie nimi] | Algne versioon | - |

**Heakskiidud:**
- Projekti juht: [Ootel]
- QA juht: [Ootel]
- Arendusmeeskond: [Ootel]

## 3. Eesmärk ja ulatus

### 3.1 Testimise eesmärk
Selle testplaani eesmärk on tagada eBayClone API kvaliteet ja usaldusväärne toiming enne tootmiskeskkonna käivitamist. API võimaldab kasutajatel registreeruda, sisse logida, kuulutusi hallata ja tellimusi teha.

### 3.2 Testimise ulatus
**Testitavad komponendid:**
- Kasutajate haldus (registreerimine, sisselogimine, profiili muutmine)
- Autentimine ja autoriseerimine (JWT tokenid)
- Kuulutuste CRUD operatsioonid
- Tellimuste haldus
- API vigade käsitlemine
- Andmete valideerimine

**Testimise tasemed:**
- API testimine (REST endpoint'id)
- Integratsioonite testimine
- Funktsionaalne testimine
- Negatiivne testimine

## 4. Viited ja alusdokumendid

- **API dokumentatsioon (inglise keel):** swagger_en.yaml
- **API dokumentatsioon (eesti keel):** swagger_et.yaml
- **Tehnilised nõuded:** README.md
- **OpenAPI 3.0 spetsifikatsioon:** https://swagger.io/specification/
- **HTTP staatuse koodide standard:** RFC 7231
- **JWT standard:** RFC 7519

**Märkus:** API dokumentatsioon on saadaval kahes keeles - inglise ja eesti keeles. Mõlemad versioonid sisaldavad sama funktsionaalsust ja endpoint'e.

## 5. Testitavad üksused

### 5.1 API Endpoint'id
**Users module:**
- POST /users (kasutaja loomine)
- GET /users/{id} (kasutaja andmete hankimine)
- PATCH /users/{id} (kasutaja andmete uuendamine)
- DELETE /users/{id} (kasutaja kustutamine)

**Sessions module:**
- POST /sessions (sisselogimine)
- DELETE /sessions (väljalogimine)

**Listings module:**
- GET /listings (kõigi kuulutuste hankimine)
- POST /listings (kuulutuse loomine)
- GET /listings/{id} (ühe kuulutuse hankimine)
- PATCH /listings/{id} (kuulutuse uuendamine)
- DELETE /listings/{id} (kuulutuse kustutamine)

**Orders module:**
- GET /orders (tellimuste hankimine)
- POST /orders (tellimuse loomine)
- GET /orders/{id} (ühe tellimuse hankimine)
- PATCH /orders/{id} (tellimuse uuendamine)
- DELETE /orders/{id} (tellimuse kustutamine)

### 5.2 Build'id ja keskkonnad
- **Arenduskeskkond:** localhost:3000
- **Tootmiskeskkond:** https://olga-orlova.me
- **Git repository:** main branch
- **Node.js versioon:** v22.14.0

## 6. Testitavad ja mittetestitavad omadused

### 6.1 Testitavad funktsioonid
**Funktsionaalsed nõuded:**
- Kasutajate registreerimine ja autentimine
- CRUD operatsioonid kõigile entiteetidele
- Authorization Bearer token'ide kaudu
- Andmete valideerimine ja sanitiseerimine
- HTTP staatuse koodide õige tagastamine
- JSON response'ide struktuur
- Kuulutuste otsimine ja filtreerimine

**Mittefunktsionaalsed nõuded:**
- API vastamise aeg (< 2 sekundi)
- Concurrent requests (kuni 100 kasutajat)
- Input/output andmete validatsioon
- Security headers ja CORS

### 6.2 Mittetestitavad funktsioonid
- Frontend kasutajaliides (pole olemas)
- Andmebaasi backup/restore
- Server hardware jõudlus
- Kolmandate osapoolte integratsioonid
- SSL sertifikaatide haldus

## 7. Testimise lähenemine

### 7.1 Testimise meetodid
**Manuaalne testimine:**
- REST API endpoint'ide testimine Postman'iga
- Funktsionaalsete test-case'ide käivitamine
- Boundary value testing
- Negative path testing

**Automaatne testimine:**
- Unit testid Jest'iga
- Integration testid Supertest'iga
- API contract testing
- CI/CD pipeline testid

### 7.2 Tööriistad
- **Manual testing:** Postman, Insomnia
- **Automated testing:** Jest, Supertest, Newman
- **CI/CD:** GitHub Actions
- **Documentation:** Swagger UI (EN/ET versions)
- **Version control:** Git

## 8. Sisenemis-, väljumis- ja peatamiskriteeriumid

### 8.1 Sisenemiskriteeriumid (Entry Criteria)
- API server on käivitatav ja kättesaadav
- Kõik endpoint'id on implementeeritud
- Swagger dokumentatsioon on ajakohane
- Unit testid on kirjutatud ja läbivad
- Test keskkond on seadistatud

### 8.2 Väljumiskriteeriumid (Exit Criteria)
- 100% API endpoint'ide test coverage
- Kõik High ja Medium priority test-case'id Pass staatuses
- 0 Critical ja High severity defektid
- Kõik automated testid läbivad CI pipelines
- Performance nõuded täidetud (< 2s response time)
- Security testid läbitud

### 8.3 Peatamiskriteeriumid (Stop Criteria)
- > 5 Critical severity defekti
- API server ei ole stabiilne (> 50% downtime)
- Test environment ei ole kättesaadav > 4 tundi
- Major scope muudatused nõuded

## 9. Ressursid ja rollid

### 9.1 Meeskond
**QA Engineer:** [Teie nimi]
- Test planning ja test case design
- Manual ja automated testing
- Defect reporting ja tracking

**Developer:** [Arendaja nimi]
- Bug fixing
- Unit testide kirjutamine
- Code review

**DevOps:** [DevOps spetsialist]
- CI/CD pipeline setup
- Test environment maintenance

### 9.2 Hardware/Software nõuded
**Testimiskeskkond:**
- OS: Windows/Linux/MacOS
- RAM: min 8GB
- Node.js: v18+
- Git client
- Postman/Insomnia
- Internet connection

## 10. Ajakava ja verstapostid

### 10.1 Testimise timeline
**Sprint 1 (Nädal 1):**
- Testplaani loomine ✅
- Test case'ide kirjutamine ✅
- Test environment setup

**Sprint 2 (Nädal 2):**
- Manual testing execution
- Automated test development
- First test run report

**Sprint 3 (Nädal 3):**
- Bug fixing ja regression testing
- Performance testing
- Final test report

### 10.2 Milestone'id
- **M1:** Test plan approval - 28.05.2025
- **M2:** Test case completion - 02.06.2025
- **M3:** First test run - 09.06.2025
- **M4:** Bug fix verification - 16.06.2025
- **M5:** Final sign-off - 23.06.2025

## 11. Keskkond ja infrastruktuur

### 11.1 Testimiskeskkonnad
**Arenduskeskkond:**
- URL: http://localhost:3000
- Eesmärk: Lokaalne arendus ja kiire testimine
- Andmebaas: Lokaalne test DB
- Availability: 24/7 (arendaja masinas)

**Tootmiskeskkond:**
- URL: https://olga-orlova.me
- Eesmärk: End-to-end testimine tootmislähedases keskkonnas
- Andmebaas: Cloud database
- Availability: 99.9% uptime

### 11.2 Infrastruktuur nõuded
**Network:**
- Internet connection min 10 Mbps
- HTTPS support
- CORS enabled

**Monitoring:**
- Server logs accessible
- API response time monitoring
- Error tracking system

## 12. Testide disaini viited

### 12.1 Käsitsi testid
**Asukoht:** `tests/manual/testcases/`
- TC-001: User Registration
- TC-002: User Login
- TC-003: Create Listing
- TC-004: Get All Listings
- TC-005: Create Order
- [Planeeritud täiendavad test-case'id: TC-006 kuni TC-020]

### 12.2 Automaattestid
**Asukoht:** `tests/automation/`
- Unit testid: `tests/automation/unit/`
- E2E testid: `tests/automation/e2e/`
- Performance testid: `tests/automation/performance/`

**Test data management:**
- Test fixtures: `tests/fixtures/`
- Mock data: `tests/mocks/`

## 13. Riskid ja leevendused

| Risk | Tõenäosus | Mõju | Risk Level | Leevendus |
|------|-----------|------|------------|-----------|
| API server downtime | Medium | High | High | Alternatiivne test server setup |
| Scope creep (nõuete muutus) | High | Medium | High | Regular stakeholder communication |
| Test data corruption | Low | High | Medium | Automated test data restoration |
| CI/CD pipeline failure | Medium | Medium | Medium | Local testing backup plan |
| Third-party dependencies | Low | Medium | Low | Dependency version locking |
| Team resource shortage | Medium | High | High | Cross-training ja dokumentatsioon |

### 13.1 Risk mitigation strategies
- **Technical risks:** Regular backups, monitoring, rollback plans
- **Resource risks:** Clear responsibility matrix, backup personnel
- **Schedule risks:** Buffer time in timeline, priority-based testing

## 14. Luba- ja auditeerimisnõuded

### 14.1 Andmekaitse (GDPR)
- Kasutajate personaalsed andmed (email, username)
- Test andmete anonümiseerimine production data kasutamisel
- Test andmete kustutamine pärast testimist

### 14.2 Security compliance
- Authentication ja Authorization testid
- Input validation security testid
- SQL injection prevention
- XSS protection verification

### 14.3 Audit trail
- Kõigi test run'ide logimine
- Test tulemuste säilitamine 6 kuud
- Defect tracking ja resolution history

**Märkus:** Antud projektis pole eraldi ISO 27001 või SOX nõudeid, kuid basic security practices järgitakse.

## 15. Testi töövoo protseduurid

### 15.1 Defekti elutsükkel
**Bug Severity levels:**
- **Critical:** API server crashes, data loss
- **High:** Core functionality broken
- **Medium:** Minor functionality issues
- **Low:** UI/Documentation issues

**Bug Status workflow:**
1. **New** → QA discovers bug
2. **Assigned** → Developer takes ownership
3. **In Progress** → Bug being fixed
4. **Fixed** → Ready for verification
5. **Verified** → QA confirms fix
6. **Closed** → Bug resolved
7. **Reopened** → Bug persists after fix

### 15.2 Change control
- Kõik API muudatused peavad läbima code review
- Breaking changes nõuavad API versioning
- Database schema muudatused nõuavad migration script'e
- Test case'id uuendatakse API muudatuste järel

### 15.3 Test execution workflow
1. **Test preparation:** Test data setup
2. **Test execution:** Manual/Automated runs
3. **Results analysis:** Pass/Fail determination
4. **Defect reporting:** Bug creation ja tracking
5. **Regression testing:** After bug fixes

## 16. Mõõdikud ja raportid

### 16.1 Key Performance Indicators (KPI)
**Test Coverage Metrics:**
- API endpoint coverage: 100%
- Test case execution rate: > 95%
- Automated test coverage: > 70%

**Quality Metrics:**
- Defect density: < 2 bugs per endpoint
- Test pass rate: > 90%
- Critical bug resolution time: < 24h

**Performance Metrics:**
- API response time: < 2 seconds
- Concurrent users support: 100 users
- System uptime: > 99%

### 16.2 Raportite sagedus
**Daily reports:**
- Test execution status
- Open defects count
- Blocker issues

**Weekly reports:**
- Test progress vs plan
- Quality metrics trends
- Risk assessment update

**Milestone reports:**
- Complete test results
- Go/No-go recommendations
- Lessons learned

## 17. Lõpuleviimise kriteerium ja hooldus

### 17.1 Testing completion criteria
**Must-have conditions:**
- Kõik High priority test case'id executed ja Pass
- 0 Critical ja High severity open bugs
- Performance benchmarks achieved
- Security tests passed
- Documentation updated

**Nice-to-have conditions:**
- 100% automated test coverage
- Load testing completed
- Monitoring dashboards setup

### 17.2 Post-release maintenance
**Test suite maintenance:**
- Test case'ide regular review (quarterly)
- Automated test'ide maintenance
- Test data refresh procedures

**Ongoing quality assurance:**
- Production monitoring setup
- User feedback integration
- Performance metrics tracking

## 18. Testjuhtumite loetelu

### 18.1 Test case kataloog
**Asukoht:** `tests/manual/testcases/`

**Olemasolevad test case'id:**
- TC-001: Edukas kasutaja registreerimine (High)
- TC-002: Edukas kasutaja sisselogimine (High)
- TC-003: Kuulutuse loomine (High)
- TC-004: Kõigi kuulutuste hankimine (High)
- TC-005: Tellimuse loomine (High)

**Planeeritud test case'id (täiendavalt 15-20):**
- TC-006: Vigane kasutaja registreerimine
- TC-007: Vigane sisselogimine
- TC-008: Kasutaja profiili uuendamine
- TC-009: Kasutaja kustutamine
- TC-010: Väljalogimine
- TC-011: Kuulutuse otsimine
- TC-012: Kuulutuse filtreerimine hinna järgi
- TC-013: Ühe kuulutuse hankimine
- TC-014: Kuulutuse uuendamine
- TC-015: Kuulutuse kustutamine
- TC-016: Tellimuste loetelu hankimine
- TC-017: Ühe tellimuse hankimine
- TC-018: Tellimuse uuendamine
- TC-019: Tellimuse kustutamine
- TC-020: Authorization failure testid

### 18.2 Test coverage matrix
| API Endpoint | Test Cases | Coverage |
|--------------|------------|----------|
| POST /users | TC-001, TC-006 | 100% |
| POST /sessions | TC-002, TC-007 | 100% |
| GET /listings | TC-004, TC-011, TC-012 | 100% |
| POST /listings | TC-003 | 80% |
| POST /orders | TC-005 | 80% |
| [Muud endpoint'id] | [Planeeritud] | 0% |

## 19. Test-run'i raportid

### 19.1 Raportite asukoht
**Kataloog:** `reports/`
**Naming convention:** `testrun_YYYY-MM-DD.md`

### 19.2 Raportite struktuur
Iga test run raport sisaldab:
- **Run metadata:** ID, kuupäev, build info
- **Execution summary:** Pass/Fail/Blocked statistika
- **Detailed results:** Test case tulemused
- **Defect summary:** Leitud bugid ja nende staatus
- **Environment info:** Test keskkonna details
- **Recommendations:** Järgmised sammud

### 19.3 Raportite schedule
- **Daily:** Automated test runs
- **Weekly:** Complete manual test cycle
- **Milestone:** Comprehensive test report
- **Pre-release:** Final sign-off report

**Märkus:** Esimene test run raport luuakse pärast test case'ide täitmist ja lisatakse `reports/` kausta.