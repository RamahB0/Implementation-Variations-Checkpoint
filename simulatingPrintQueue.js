class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

class PrinterQueue {
  constructor() {
    this.queue = new Queue();
  }

  addJob(name, pages) {
    const job = { name, pages };
    this.queue.enqueue(job);
    console.log(`Job added: ${name} (${pages} pages)`);
  }

  processJob() {
    if (this.queue.isEmpty()) {
      console.log("No jobs in the queue.");
      return null;
    }
    const job = this.queue.dequeue();
    console.log(`Processing job: ${job.name} (${job.pages} pages)`);
    return job;
  }

  processAllJobs() {
    console.log("Processing all jobs...");
    while (!this.queue.isEmpty()) {
      this.processJob();
    }
    console.log("All jobs processed.");
  }

  peekNextJob() {
    const job = this.queue.peek();
    if (job) {
      console.log(`Next job: ${job.name} (${job.pages} pages)`);
    } else {
      console.log("No jobs in the queue.");
    }
    return job;
  }

  displayQueue() {
    if (this.queue.isEmpty()) {
      console.log("Queue is empty.");
      return;
    }
    console.log("Current print queue:");
    this.queue.items.forEach((job, index) => {
      console.log(`  ${index + 1}. ${job.name} (${job.pages} pages)`);
    });
  }
}

// Test the PrinterQueue
const printer = new PrinterQueue();

// Add jobs to the queue
printer.addJob("Alice-Report.pdf", 15);
printer.addJob("Bob-Presentation.pptx", 8);
printer.addJob("Charlie-Invoice.pdf", 3);
printer.addJob("Diana-Manual.docx", 42);
printer.addJob("Eve-Summary.pdf", 5);

// Display the current queue
printer.displayQueue();

// Peek at the next job
printer.peekNextJob();

// Process the first job
printer.processJob();

// Display the queue after processing one job
console.log("Queue after processing first job:");
printer.displayQueue();

// Process all remaining jobs
console.log("Processing all remaining jobs:");
printer.processAllJobs();

// Display the queue (should be empty now)
console.log("Queue after processing all jobs:");
printer.displayQueue();
