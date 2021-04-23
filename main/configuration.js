    // configuration file for protractor
    //var mainDataSet = require('../testData/dataSetMain')//example
    // Configuration file for our DropBox testing projects


    var mantisBt = require("../testData/mantisBt")
    var tenantNameReport=null;
    var retry = require('protractor-retry').retry;

    exports.config = {

        directConnect: true,

        baseUrl: mantisBt.domain,

        //seleniumAddress: "http://192.168.10.31:4444/wd/hub",
        //maxSessions: 2,
        //maxInstance:2,

        // Capabilities to be passed to the webdriver instance.

        multiCapabilities: [
            {
                browserName: 'chrome',
               // tName: 'nilavochrome41',
                chromeOptions: {

                //args: ['--headless']
                },


        // },
        /* {
                browserName: 'chrome',
                tName:'chrome02',
                chromeOptions: {

                    //args: ['--headless']
                },

            },*/

            /*{
                browserName: 'firefox',
                tName:'nilavochrome09',

                'moz:webdriverClick': false,
                'moz:firefoxOptions':{
                    //args: ["--safe-mode"],
                }*/



            },

    /*     {
                browserName:'MicrosoftEdge',


            },*/

            /*     {

                    browserName:'safari',
                    shardTestFiles: true
                }*/
        ],

    logLevel: 'ERROR',




        // We are using jasmine framework
        framework: 'jasmine',

        specs:[

            /*       'tests/functionalTest/superUserFunctionality.spec.js',
                'tests/functionalTest/tenantManagerFunctionality.spec.js',
                'tests/functionalTest/composeMessage.spec.js'
                'tests/functionalTest/deletedItems.spec.js'*/

        ],



        suites:{
            functionalTest: [

                'tests/functionalTest/loginFunctionality.spec.js'

            ]

        },

        // Spec patterns are relative to the current working directory when

        onComplete: function () {

            var browserName, browserVersion;
            var capsPromise = browser.getCapabilities();
        
            capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
        
            var HTMLReport = require('protractor-html-reporter');
        
            testConfig = {
                reportTitle: 'Test Execution Report',
                outputPath: '../testReport/allure/htmlReport/',
                screenshotPath: '../testReport/allure/htmlReport/screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true
            };
            new HTMLReport().from('../testReport/allure/xmlReport/xmloutput.xml', testConfig);
        });

            console.log('completed')

        },

        onCleanUp: function (results) {

            //retry.onCleanUp(results);
            // mailListener.stop();
        },
        afterLaunch: function() {
            //return retry.afterLaunch(2);
        },
        onPrepare: function () {


            //retry.onPrepare();
            //require('jasmine-expect');

            var jasmineReporters = require('jasmine-reporters');
            jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: '../testReport/allure/xmlReport',
            filePrefix: 'xmloutput'
        }));







            browser.driver.manage().window().maximize();
            console.log('prepared')

            //browser.manage().timeouts().pageLoadTimeout(40000);

            browser.ignoreSynchronization = true

            var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
            jasmine.getEnv().addReporter(
                new SpecReporter({

                    suite: {

                        displayNumber: true,
                        displayStacktrace: 'all',      // display stacktrace for each failed assertion, values: (all|specs|summary|none)
                    
                    },


                    displayStacktrace: 'all',      // display stacktrace for each failed assertion, values: (all|specs|summary|none)
                    displaySuccessesSummary: true, // display summary of all successes after execution
                    displayFailuresSummary: true,   // display summary of all failures after execution
                    displayPendingSummary: true,    // display summary of all pending specs after execution
                    displaySuccessfulSpec: true,    // display each successful spec
                    displayFailedSpec: true,        // display each failed spec
                    displayPendingSpec: true,      // display each pending spec
                    displaySpecDuration: true,     // display each spec duration
                    displaySuiteNumber: true,      // display each suite number (hierarchical)

                    colors: {
                        success: 'green',
                        failure: 'red',
                        pending: 'yellow'
                    },

                    prefixes: {
                        success: '✓ ',
                        failure: '✗ ',
                        pending: '* '
                    }

                }))

            browser.getProcessedConfig().then(function (value){
                //jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
                tenantNameReport = value.capabilities.tName
                var HtmlReporter = require('protractor-beautiful-reporter');
                jasmine.getEnv().addReporter(new HtmlReporter({

                    baseDirectory: '../testReport/'+mantisBt.ReportGenerator.testName+'/'+mantisBt.ReportGenerator.version+'/',
                    gatherBrowserLogs: false,
                    docTitle: 'Mantis BT Test Results'
                }).getJasmine2Reporter());

            })



            var AllureReporter = require('jasmine-allure-reporter');
            jasmine.getEnv().addReporter(new AllureReporter({
                resultsDir: '../testReport/allure/allure-results'
            }));

            jasmine.getEnv().afterEach(function(done){
                browser.takeScreenshot().then(function (png) {
                    allure.createAttachment('Screenshot', function () {
                        return new Buffer(png, 'base64')
                    }, 'image/png')();
                    done();
                })
            });



        },


        // Options to be passed to Jasmine.
        jasmineNodeOpts: {

            stopSpecOnExpectationFailure: false,

            showColors: true,
            defaultTimeoutInterval: 3000000

        },

        logLevel: 'ERROR',

    };